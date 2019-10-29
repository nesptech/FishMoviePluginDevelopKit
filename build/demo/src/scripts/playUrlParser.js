function loadInfoPage() {
    try {
        const mVideoInfo = {
            "name": "",
            "title": "",
            "status": "",
            "coverImageUrl": "",
            "playLineList": [],
            "videoClass": "",
            "types": "",
            "score": "",
            "infoUrl": "",
            "stars": "",
            "Director": "",
            "updateTime": "",
            "showTime": "",
            "introduction": "",
            "area": "",
            "language": "",
            "headerTime": 0,
            "tailTime": 0,
            "videoType": -1,
        };
        mVideoInfo.coverImageUrl = document.getElementsByClassName("vod-n-img")[0].getElementsByTagName("img")[0].attributes["data-original"].value;
        const videoInfoText = document.getElementsByClassName("vod-n-l")[0].textContent;
        mVideoInfo.name = videoInfoText.split("状态：")[0];
        mVideoInfo.title = videoInfoText.split("状态：")[1].split("主演：")[0];
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("类型：")[0];
        mVideoInfo.types = videoInfoText.split("类型：")[1].split("导演：")[0];
        mVideoInfo.Director = videoInfoText.split("导演：")[1].split("年份：")[0];
        mVideoInfo.showTime = videoInfoText.split("年份：")[1].split("语言：")[0];
        mVideoInfo.language = videoInfoText.split("语言：")[1].split("地区：")[0];
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("更新：")[0];
        mVideoInfo.updateTime = videoInfoText.split("更新：")[1].split("简介：")[0];
        mVideoInfo.introduction = document.getElementsByClassName("vod_content")[0].textContent;
        let playLineNames = [];
        let playLineInfo = document.getElementsByClassName("vod-info-tab")[0];
        let playLineNameElements = playLineInfo.getElementsByTagName("a");
        for (let i = 0; i < playLineNameElements.length; i++) {
            playLineNames.push(playLineNameElements[i].textContent);
        }
        let playLineEpisodeInfoElements = playLineInfo.getElementsByClassName("play-box");
        for (let i = 0; i < playLineEpisodeInfoElements.length; i++) {
            let episodeItemEpisodeElements = playLineEpisodeInfoElements[i].getElementsByClassName("plau-ul-list")[0].getElementsByTagName("li");
            const mPlayLine = {"name": "", "videoEpisodeList": []};
            mPlayLine.name = playLineNames[i];
            for (let i = episodeItemEpisodeElements.length - 1; i > -1; i--) {
                const a = episodeItemEpisodeElements[i].getElementsByTagName("a")[0];
                const mVideoEpisode = {"name": "", "url": ""};
                mVideoEpisode.name = a.attributes["title"].value;
                mVideoEpisode.url = document.location.protocol + "//" + window.location.host + a.attributes["href"].value;
                mPlayLine.videoEpisodeList.push(mVideoEpisode);
            }
            mVideoInfo.playLineList.push(mPlayLine);
        }
        console.log(JSON.stringify(mVideoInfo));
        //向小丑鱼发送详情页数据
        try {
            window.videoPluginEngine.sendVideoInfo(JSON.stringify(mVideoInfo));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadInfoPage();