/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 15:12:57
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 16:21:46
 */
namespace MoviePluginSdk {
  export class VideoPluginInfo {
    public hostUrl: string = "";
    public intro: string = "";
    public mainPageUrl: string = "";
    public mainPageScript: string = "";
    public moviePageUrl: string = "";
    public soapPageUrl: string = "";
    public varietyPageUrl: string = "";
    public animPageUrl: string = "";
    public searchPageUrl: string = "";
    public searchPageScript: string = "";
    public videosPageScript: string = "";
    public infoPageScript: string = "";
    public playUrlParserScript: string = "";
    public verName: string = "";
    public author: string = "";
    public img: string = "";
    public introShort: string = "";
    public updateTime: string = "";
    public name: string = "";
    private supports = [true];
    public tags: string[] = ["快速"];
    public vipCode: number = 0;
    public verCode: number = 0;
    public engineVerCode: number = 0;

    public getSupportUI(): boolean {
      return this.supports[0];
    }
    public setSupportUI(isSupport: boolean) {
      this.supports[0] = isSupport;
    }
  }


  export class Utils {
    public static println(param: any[]) {
      console.log(param)
    }
  }


}

