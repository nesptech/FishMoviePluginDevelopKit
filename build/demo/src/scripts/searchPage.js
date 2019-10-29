/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 21:49:04
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 21:49:05
 */
function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.getElementsByClassName("new_tab_img")[0].getElementsByTagName("li");
        for (let i = 0; i < videosItemElems.length; i++) {
            let videoItemContentEle = videosItemElems[i].getElementsByTagName("a")[0];
            let video = {"videoSourceName": "笨笨鸡"};
            let videoInfo = videosItemElems[i].getElementsByClassName("list_info")[0].textContent;
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value;
            video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["src"].value;
            video.videoClass = videoInfo.split("分类：")[1].split("类型：")[0];
            video.types = videoInfo.split("类型：")[1].split("演员：")[0];
            video.stars = videoInfo.split("演员：")[1].split("状态：")[0];
            video.status = videoInfo.split("状态：")[1].split("时间：")[0];
            video.updateTime = videoInfo.split("时间：")[1];
            mSearchPage.videoList.push(video)
        }

        //检测下一页
        let searchPagesEle = document.getElementsByClassName("ui-vpages")[0];
        let pages = null;
        try {
            pages = searchPagesEle.getElementsByTagName("strong")[0].innerText.trim().split(/\s+/)[1];
        } catch (e) {
        }

        mSearchPage.haveNextPage = false;
        mSearchPage.nextPageUrl = "";
        if (pages != null) {
            let fullPage = pages.trim().split("/")[1];
            let currentPage = pages.trim().split("/")[0];
            mSearchPage.haveNextPage = currentPage / fullPage < 1;
            if (mSearchPage.haveNextPage) {
                mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + searchPagesEle.getElementsByClassName("pagegbk")[0].attributes["href"].value;
            }
        }

        console.log(JSON.stringify(mSearchPage));
        //向小丑鱼发送搜索页面数据
        try {
            window.videoPluginEngine.sendSearchVideoPage(JSON.stringify(mSearchPage));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadSearchPage();