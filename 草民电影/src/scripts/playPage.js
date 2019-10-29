/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-27 01:28:47
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-27 01:28:47
 */
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
        const htmlVideoInfo = document.getElementsByClassName('ct')[0];
        mVideoInfo.coverImageUrl = htmlVideoInfo.getElementsByTagName("img")[0].attributes["data-original"].value;

        const videoInfoText = htmlVideoInfo.getElementsByClassName('ct-c')[0].textContent;

        mVideoInfo.name = videoInfoText.split("状态：")[0].trimEnd().trimStart();
        try {
            mVideoInfo.title = htmlVideoInfo.getElementsByClassName('bz')[0].textContent;
            mVideoInfo.name = mVideoInfo.name.replace(mVideoInfo.title, '')
        } catch (e) {

        }
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("类型：")[0].trimEnd().trimStart();
        mVideoInfo.types = videoInfoText.split("类型：")[1].split("更新：")[0].trimStart().trimEnd();
        mVideoInfo.updateTime = videoInfoText.split("更新：")[1].split("导演：")[0].trimEnd().trimStart();

        mVideoInfo.Director = videoInfoText.split("导演：")[1].split("地区：")[0].trimEnd().trimStart();
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("年份：")[0].trimEnd().trimStart();
        mVideoInfo.showTime = videoInfoText.split("年份：")[1].split("语言：")[0].trimEnd().trimStart();
        mVideoInfo.language = videoInfoText.split("语言：")[1].split("剧情介绍：")[0].trimEnd().trimStart();

        mVideoInfo.introduction = document.getElementsByClassName("tab-jq")[0].textContent.trimEnd().trimStart();

        let episodeItemEpisodeElements = document.getElementById('vlink_1').getElementsByTagName("a");
        const mPlayLine = {"name": "线路一", "videoEpisodeList": []};
        for (let i = 0; i < episodeItemEpisodeElements.length; i++) {
            const mVideoEpisode = {"name": "", "url": ""};
            mVideoEpisode.name = episodeItemEpisodeElements[i].attributes["title"].value;
            mVideoEpisode.url = document.location.protocol + "//" + window.location.host + episodeItemEpisodeElements[i].attributes["href"].value;
            mPlayLine.videoEpisodeList.push(mVideoEpisode);
        }
        mVideoInfo.playLineList.push(mPlayLine);
        console.log(JSON.stringify(mVideoInfo));
        //向小丑鱼发送详情页数据
        try {
            window.videoPluginEngine.sendVideoInfo(JSON.stringify(mVideoInfo));
        } catch (e) {
        }
    } catch (e) {
        try {
            window.videoPluginEngine.sendError(e.toString());
        } catch (e) {

        }
    }
}

loadInfoPage();