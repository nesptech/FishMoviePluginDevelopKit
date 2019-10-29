/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 21:48:28
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 21:48:28
 */
function loadMainVideoPage() {
    try {
        let mMainVideoPage = {
            "slideVideos": [],
            "newPlay": [],
            "newMovie": [],
            "newSoap": [],
            "newVariety": [],
            "newAnim": []
        };

        //获取视频列表
        function getVideos(ele) {
            let videoLis = ele.getElementsByTagName("li");
            let videos = [];
            for (let i = 0; i < videoLis.length; i++) {
                let videoItemContentEle = videoLis[i].getElementsByTagName("a")[0];
                let video = {};
                video.infoUrl = window.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
                video.name = videoItemContentEle.attributes["title"].value;
                try {
                    video.score = videoItemContentEle.getElementsByClassName("score")[0].textContent;
                } catch (e) {
                }
                try {
                    video.title = videoItemContentEle.getElementsByClassName("title")[0].textContent;
                } catch (e) {
                }
                try {
                    video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["src"].value;
                } catch (e) {
                }
                videos.push(video);
            }
            return videos;
        }

        //获取主页轮播数据
        let swiperItems = document.getElementsByClassName("swiper-wrapper")[0].getElementsByTagName("a");
        for (let i = 0; i < swiperItems.length; i++) {
            let swiperItem = swiperItems[i];
            let img = swiperItem.getElementsByTagName("img")[0];
            let video = {};
            video.infoUrl = window.location.protocol + "//" + window.location.host + swiperItem.attributes["href"].value;
            video.coverImageUrl = img.attributes["src"].value;
            video.title = img.attributes["title"].value;
            mMainVideoPage.slideVideos.push(video);
        }

        mMainVideoPage.newMovie = getVideos(document.querySelector("body > div:nth-child(10) > div.all_tab"));
        mMainVideoPage.newSoap = getVideos(document.querySelector("body > div:nth-child(12) > div.all_tab"));
        mMainVideoPage.newVariety = getVideos(document.querySelector("body > div:nth-child(16) > div:nth-child(1)"));
        mMainVideoPage.newAnim = getVideos(document.querySelector("body > div:nth-child(14) > div:nth-child(1)"));
        //向浏览器打印数据，调试时用
        console.log(JSON.stringify(mMainVideoPage));
        //向小丑鱼发送主页数据
        try {
            window.videoPluginEngine.sendMainVideoPage(JSON.stringify(mMainVideoPage));
        } catch (e) {
        }
    } catch (e) {
        //向小丑鱼发送错误信息
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadMainVideoPage();