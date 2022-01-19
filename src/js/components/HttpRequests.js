import Betting from '../../libs/betting.js';

export const getDatafromServer = () => new Promise((resolve, reject) => {
  const betting = new Betting();

  betting.auth({
    client_id: 'marketing-1a49fe24c1af4278c541a52a3c2ffca7',
    client_secret: 'xJM$*Pf1eD#K4Gb@!Od5V@iTLWR6dbVFKVfghjU!YH#pe0Cc18&TsEVC*RH3XQya',
    ref: 51,
  })
    .then((token) => {
      betting.get_matches({ lng: 'ru', count: 15 })
        .then((matches) => resolve(matches))
        .fail((err) => reject(err));
    });
});
