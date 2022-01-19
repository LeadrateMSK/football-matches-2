import axios from 'axios'; // Для запросов
import qs from 'qs'; // Для формирования строки из параметров запроса

export default class Betting {
  DOMAIN = 'https://cpservm.com';

  TOKEN_URI = `${this.DOMAIN}/gateway/token`;

  MAIN_URI = `${this.DOMAIN}/gateway/marketing/datafeed`;

  MATCHES_URI = `${this.MAIN_URI}/prematch/api/v2/sportevents`;

  LIVE_MATCHES_URI = `${this.MAIN_URI}/live/api/v2/sportevents`;

  DEFAULT_LANG = 'ru';

  DEFAULT_VERSION = 'v1';

  TOKEN = ''; // Токен для Bearer авторизации

  REF = ''; // Рефка партнёра

  /**
     * Основная функция авторизации
     * @param  {object} data - объект с client_id и client_secret для получения токена авторизации
     * @return {func} - функция получения токена
     */
  async auth(data) {
    return this.get_token(data);
  }

  /**
     * Получаем токен Bearer авторизации
     * @param  {object} data - объект с client_id и client_secret для получения токена авторизации
     * @return {promise} - функция получения токена
     */
  get_token(data) {
    return new Promise((resolve, reject) => {
      const authParams = {
        client_id: data.client_id,
        client_secret: data.client_secret,
      };

      // Сразу указываем рефку на весь объект
      this.REF = data.ref;

      const authOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(authParams),
        url: this.TOKEN_URI,
      };

      axios(authOptions)
        .then((response) => {
          // Устанавливаем полученный токен для работы с API
          this.TOKEN = response.data;

          // Сообщаем, что токен получен
          resolve(response.data);
        })
        .catch((error) => {
          reject('Авторизация не удалась. Проверьте корректность введённых данных', error);
        });
    });
  }

  /**
     * Получаем любой доступный справочник
     * @param  {string} which - название справочника
     * @param  {string} lang  - язык справочника (кроме языкового справочника)
     * @param  {string} ver   - версия api
     * @return {promise}      - результат промиса (данные или ошибка)
     */
  async get_catalogue(which, lang, version) {
    return new Promise((resolve, reject) => {
      const lng = lang ?? this.DEFAULT_LANG;
      const ver = version ?? this.DEFAULT_VERSION;

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.TOKEN.access_token}`,
        },
        url: `${this.MAIN_URI}/directories/api/`,
      };

      // Ищем запрашиваемый справочник
      switch (which) {
        case 'language':
          options.url += `${ver}/language`;
          break;
        case 'sports':
          options.url += `${ver}/sports?ref=${this.REF}&lng=${lng}`;
          break;
        case 'subsports':
          options.url += `${ver}/subsports?ref=${this.REF}&lng=${lng}`;
          break;
        case 'types':
          options.url += `${ver}/types?lng=${lng}`;
          break;
        case 'vid':
          options.url += `${ver}/vid?lng=${lng}`;
          break;
        case 'sportevents':
          options.url += `${ver}/sportevents?ref=${this.REF}&lng=${lng}`;
          break;
        default:
          reject(`Справочника "${which}" не существует`);
          break;
      }

      axios(options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
     * Получаем массив матчей
     * @param  {string} type_matches - тип матчей (LIVE или линия)
     * @param  {object} options - параметры запроса
     * @return {promise} - массив матчей
     */
  async get_matches(options, type_matches) {
    return new Promise((resolve, reject) => {
      // Если type_matches не указан, то возвращаем линию по-умолчанию
      typeof type_matches === 'undefined' ? type_matches = 'line' : '';

      const params = {
        lng: options.lng ?? this.DEFAULT_LANG, // Двухбуквенный код языка. Значение по умолчанию "ru"
        ref: this.REF, // Идентификатор партнера (данный параметр необходимо уточнять у менеджера)
        count: options.count, // Максимальное количество спортивных событий, которое будет возвращено в ответе. По умолчанию 100.
        sportids: options.sportids, // Массив идентификаторов спортов. По умолчанию все спорты из справочника.
        subsportids: options.subsportids, // Массив идентификаторов дисциплин
        tournamentids: options.tournamentids, // Массив идентификаторов турниров. По умолчанию все турниры
        sporteventids: options.sporteventids, // Массив идентификаторов спортивных событий. Может содержать как sportEventId так и constSportEventId
        vids: options.vids, // Массив идентификаторов видов спортивных событий. По умолчанию всегда 1 (основной вид)
        types: options.types, // Массив идентификаторов типов спортивных событий. По умолчанию всегда 1 (основной тип)
        periods: options.periods, // Массив номеров периодов спортивных событий. По умолчанию всегда 0 (основное спортивное событие)
        oddsIds: options.oddsIds, // Массив идентификаторов маркетов спортивного события (из справочника)
        schemeofgettingoddspperations: options.schemeofgettingoddspperations, // Схема возвращаемых маркетов
        gtstart: options.gtstart, // Фильтр спортивных событий по времени дата старта которых больше указанного значения. Задается как Unix Epoch.
        ltstart: options.ltstart, // Фильтр спортивных событий по времени дата старта которых меньше указанного значения. Задается как Unix Epoch
      };

      let REQUEST_URI = type_matches.toLowerCase() == 'live' ? `${this.LIVE_MATCHES_URI}?` : `${this.MATCHES_URI}?`;
      REQUEST_URI += `ref=${this.REF}&`;
      params.lng != null ? REQUEST_URI += `lng=${params.lng}&` : '';
      params.count != null ? REQUEST_URI += `count=${params.count}&` : '';
      params.sportids != null ? REQUEST_URI += `sportids=${params.sportids}&` : '';
      params.subsportids != null ? REQUEST_URI += `subsportids=${params.subsportids}&` : '';
      params.tournamentids != null ? REQUEST_URI += `tournamentids=${params.tournamentids}&` : '';
      params.sporteventids != null ? REQUEST_URI += `sporteventids=${params.sporteventids}&` : '';
      params.vids != null ? REQUEST_URI += `vids=${params.vids}&` : '';
      params.types != null ? REQUEST_URI += `types=${params.types}&` : '';
      params.periods != null ? REQUEST_URI += `periods=${params.periods}&` : '';
      params.oddsIds != null ? REQUEST_URI += `oddsIds=${params.oddsIds}&` : '';
      params.schemeofgettingoddspperations != null ? REQUEST_URI += `schemeofgettingoddspperations=${params.schemeofgettingoddspperations}&` : '';
      params.gtstart != null ? REQUEST_URI += `gtstart=${params.gtstart}&` : '';
      params.ltstart != null ? REQUEST_URI += `ltstart=${params.ltstart}&` : '';

      const optionsAxios = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.TOKEN.access_token}`,
        },
        url: REQUEST_URI,
      };

      axios(optionsAxios)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  /**
     * Ищем матчи по их постоянным идентификаторам
     * @param  {array} matches - массив матчей, среди которых будет осуществлён поиск
     * @param  {object} matches_ids - матчи, которые ищем
     * @return {array} - массив найденных матчей
     */
  find_matches(matches, matches_ids) {
    matches = matches.filter((match) => {
      const id = matches_ids.indexOf(match.constSportEventId) != -1;
      return id;
    });

    return matches;
  }
}

window.Betting = Betting;
