

export default{
    port:1337,

    dbUri:"mongodb://127.0.0.1:27017/RestApiTypescript",
    saltWorkFactor:10,
    accessPrivateKey:"./cert/accessPrivateKey.pem",
    accessPublicKey:"./cert/accessPublicKey.pem",
    refreshPrivateKey:"./cert/refreshPrivateKey.pem",
    refreshPublicKey:"./cert/refreshPublicKey.pem",
    accessTokenTtl:"15m",
    refreshTokenTtl:"1y",

};
