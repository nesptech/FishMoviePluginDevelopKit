/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 17:52:09
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 21:49:16
 */
function loadVideoListPage() {
    try {
        let mVideoPage = {"videoClassGroups": [], "videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        //获取筛选类别
        let selectList = document.getElementsByClassName("selectList")[0];
        let selectGroupsLi = selectList.getElementsByTagName("li");
        for (let i = 0; selectGroupsLi.length > i; i++) {
            let mVideoClassGroup = {"videoClasses": []};
            let selects = selectGroupsLi[i].getElementsByTagName("a");
            for (let j = 0; j < selects.length; j++) {
                let mVideoClass = {
                    "pageUrl": document.location.protocol + "//" + window.location.host + selects[j].attributes["href"].value,
                    "name": selects[j].text
                };
                mVideoClassGroup.videoClasses.push(mVideoClass);
            }
            mVideoPage.videoClassGroups.push(mVideoClassGroup);
        }

        let videoItemEles = document.getElementById("vod_list").getElementsByTagName("li");

        for (let i = 0; i < videoItemEles.length; i++) {

            let videoItemContentEle = videoItemEles[i].getElementsByTagName("a")[0];

            let video = {};
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value;
            try {
                video.score = videoItemContentEle.getElementsByClassName("score")[0].textContent;
            } catch (e) {
            }
            try {
                video.title = videoItemContentEle.getElementsByClassName("title")[0].textContent;
            } catch (e) {
            }
            video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["src"].value;
            mVideoPage.videoList.push(video);
        }

        //检测下一页信息
        let pagesEle = document.getElementsByClassName("ui-vpages")[0];
        if (pagesEle.getElementsByTagName("strong")[0] != null) {
            let pages = pagesEle.getElementsByTagName("strong")[0].innerText.trim().split(/\s+/)[1];
            let fullPage = pages.trim().split("/")[1];
            let currentPage = pages.trim().split("/")[0];
            mVideoPage.haveNextPage = currentPage / fullPage < 1;
            if (mVideoPage.haveNextPage) {
                mVideoPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pagesEle.getElementsByClassName("pagegbk")[0].attributes["href"].value;
            }
        } else {
            mVideoPage.haveNextPage = false
        }
        console.log(JSON.stringify(mVideoPage));
        //向小丑鱼发送数据
        try {
            window.videoPluginEngine.sendVideoPage(JSON.stringify(mVideoPage));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadVideoListPage();