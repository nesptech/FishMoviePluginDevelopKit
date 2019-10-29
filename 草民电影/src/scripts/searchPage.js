function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};

        let videosItemElems = document.getElementsByClassName("index-area")[0].getElementsByTagName("li");

        for (let i = 0; i < videosItemElems.length; i++) {
            let videoItemContentEle = videosItemElems[i].getElementsByTagName("a")[0];
            let video = {"videoSourceName": "草民电影"};

            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value;
            video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value;
            video.title = video.status = videoItemContentEle.getElementsByClassName('other')[0].textContent;

            mSearchPage.videoList.push(video)
        }

        //检测下一页
        let searchPagesEle = document.getElementsByClassName("page")[0];
        const pagesa = searchPagesEle.getElementsByTagName('a');
        for (let i = 0; i < pagesa.length; i++) {
            if (pagesa[i].text === '下一页') {
                mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pagesa[i].attributes['href'].value;
            }
        }
        mSearchPage.haveNextPage = mSearchPage.nextPageUrl !== '';

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