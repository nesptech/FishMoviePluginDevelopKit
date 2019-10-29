exports.FishMovieSdk = {
    videoPluginInfo: {
        hostUrl: "",
        intro: "",
        verName: "v0.0.1",
        author: "小丑鱼",
        img: "",
        introShort: "",
        updateTime: "",
        supports: [false],
        name: "",
        tags: ["快速"],
        vipCode: 0,
        verCode: 0,
        engineVerCode: 1,
        mainPageUrl: "",
        moviePageUrl: "",
        soapPageUrl: "",
        varietyPageUrl: "",
        animPageUrl: "",
        searchPageUrl: "",
        mainPageScript: "./scripts/mainPage.js",
        searchPageScript: "./scripts/searchPage.js",
        videosPageScript: "./scripts/videosPage.js",
        infoPageScript: "./scripts/playPage.js",
        playUrlParserScript: "./scripts/playUrlParser.js"
    },
    getVideoPluginInfoNoUI: function () {
        return {
            hostUrl: FishMovieSdk.videoPluginInfo.hostUrl,
            intro: FishMovieSdk.videoPluginInfo.intro,
            searchPageUrl: FishMovieSdk.videoPluginInfo.searchPageUrl,
            searchPageScript: FishMovieSdk.videoPluginInfo.searchPageScript,
            infoPageScript: FishMovieSdk.videoPluginInfo.infoPageScript,
            playUrlParserScript: FishMovieSdk.videoPluginInfo.playUrlParserScript,
            verName: FishMovieSdk.videoPluginInfo.verName,
            author: FishMovieSdk.videoPluginInfo.author,
            img: FishMovieSdk.videoPluginInfo.img,
            introShort: FishMovieSdk.videoPluginInfo.introShort,
            updateTime: FishMovieSdk.videoPluginInfo.updateTime,
            supports: FishMovieSdk.videoPluginInfo.supports,
            name: FishMovieSdk.videoPluginInfo.name,
            tags: FishMovieSdk.videoPluginInfo.tags,
            vipCode: FishMovieSdk.videoPluginInfo.vipCode,
            verCode: FishMovieSdk.videoPluginInfo.verCode,
            engineVerCode: FishMovieSdk.videoPluginInfo.engineVerCode
        }
    }
};
