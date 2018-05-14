<template>
  <div class="page">
    <video id="detailVideo" :src="videoUrl" controls autoplay='true'></video>
    <showAll :profile='mediaDetail' v-if='showAll'></showAll>
    <div class="title detailCart">
      <div class="playNum">
                播放： {{mediaDetail.vv}}
      </div>
      <div class="mediaTitle">
        <div class="mediaName">{{mediaDetail.name}}</div>
        <div class="mediaDetail" @click="showDetail" v-if="template!=='vplay'">详情 ></div>
      </div>
    </div>
    <div class="selections detailCart" v-if="playList.length>1">
      <div class="mediaTitle">
        <div style="flex:1;text-align: left;font-size: 0.9rem;">选集</div>
        <div class="mediaDetail" @click="showAll">更新至{{playList.length}}集</div>
      </div>
      <div style="padding: 0.3rem 0;overflow: hidden;" ref="selectionScroll">
        <scroll-view scroll-x class="selection" ref="selection">
          <view v-for="(item,index) in playList" class='mediaNums' :class="index == mplayNum ? 'active' : ''" @click="selectNum(item.id,index)">{{item.num}}</view>
        </scroll-view>
      </div>
    </div>
    <div class="otherVideo">
      <div class="detailCart" v-for="(items,indexs) in otherVideo">
        <div class="mediaTitle">
          <div style="flex:1;text-align: left;">{{items.name}}</div>
          <div class="mediaDetail" @click="showAll">{{items.contents.length}}</div>
        </div>
        <div style="padding: 0.3rem 0;overflow: hidden;" ref="selectionScroll">
          <scroll-view scroll-x class="otherList">
            <div class="cart" v-for="(list,key) in items.contents" @click="reloadPage(list.id,list.template)">
              <div class="cart-img" >
                <img class="catImg" :src="list.still"/>
              </div>
              <div class="cart-name">
                <div class="name">{{list.name}}</div>
                <div class="aword">{{list.aword}}</div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
  import { decode, base64_encode } from './../../utils/getPlayUrl.js'
  import showAll from '../../components/showAll.vue'
  
  var initData = {
    videoUrl: '',
    template: '',
    playList: [],
    playRequestParam: {},
    otherVideo:[],
    mediaDetail:{},
    hashId: "",
    ipAdress: '',
    mplayNum:0,
    showAll:false
  }
  var reData = JSON.parse(JSON.stringify(initData));
  
  export default {
    data: initData,
    components: {showAll},
    onLoad (e) {
      console.log("上个页面传过来的数据",e)
      var mediaId = e.mid
      this.template = e.template;
      this._initPlayDetail(mediaId)
    },
    onReady: function (res) {
      this.videoContext = wx.createVideoContext('detailVideo')
    },
    onUnload () {//重置数据，mpvue保存的数据在root里面，不会再次初始化
      // Object.assign(this.$data, reData)
    },
    methods: {
      showDetail() {
      	console.log('显示所有剧集！');
        this.showAll = true;
      },
      selectNum(id,index){
        this.mplayNum = index;
        this.videoContext.pause();
      	this._getPlayId(id);
      },
      reloadPage(id,template){
        this.template = template;
        this.videoContext.pause();
        this._initPlayDetail(id);
      },
      _initPlayDetail (mediaId) {
        if (mediaId) {
          if (this.template === 'vplay') {
            this._getPlayId(mediaId)
          } else {
            let that = this
            wx.request({
              url: 'http://pm.funshion.com/v5/media/episode?id=' + mediaId,
              success: function (res) {
                var id = res.data.episodes[0].id
                that._getPlayId(id)
                that.playList = res.data.episodes
              }
            })
          }
          this._getMediaMsg(mediaId);
          this._getOtherVideo(mediaId);
        } else {
          wx.showModal({
            content: '未得到视频id'
          })
        }
      },
      _getPlayId (id) {
        let url
        let that = this
        if (this.template === 'vplay') {
          url = 'http://pv.funshion.com/v7/video/play/?id=' + id
        } else {
          url = 'http://pm.funshion.com/v7/media/play/?id=' + id
        }
        wx.request({
          url: url,
          success: function (res) {
            that._initPlayData(res.data.playlist)
            that._getCdnInfo()
          }
        })
      },
      _getCdnInfo () {
        let that = this
        wx.request({
          url: 'http://jobsfe.funshion.com/query/v1/mp4/' + that.hashId + '.json',
          success: function (res) {
            if(res.data.return === 'succ'){
              that.ipAdress = res.data.playlist[0].urls[0]
              that._getPlayUrl()
            }else{
              wx.showModal({
              	content: '视频不见了~'
              })
            }
          }
        })
      },
      _getPlayUrl () {
        var url = '',
          param = this.playRequestParam,
          urlSearch = '?';
        if(param) {
          for(var i in param) {
            urlSearch = urlSearch + i + '=' + param[i] + '&';
          }
        }
        url = this.ipAdress + urlSearch;
        this.videoUrl = url;
      },
      _getOtherVideo(id) {
        let that = this;
        wx.request({
          url: "http://pm.funshion.com/v6/media/relate?id=" + id,
          success: function (res) {//这里是detail模块,得到相关视频的列表
             that.otherVideo = res.data.relates;
          }
        })
      },
      _getMediaMsg(id) {
        let url,that = this;
        if(this.template == 'vplay'){
          url = "http://pv.funshion.com/v5/video/profile?id=" + id;
        }else{
          url = "http://pm.funshion.com/v5/media/profile?id=" + id;
        }
        wx.request({
          url: url,
          success: function (res) {//视频信息
            that.mediaDetail = res.data;
          }
        })
      },
      _initPlayData (t) {
        var e = [],
          i = this.quality,
          r = {
            tv: 1,
            dvd: 2,
            hd: 3,
            sdvd: 4
          };
        t.forEach(function(t) {
          t.playinfo.forEach(function(i) {
            "h.264" == i.codec && (t.playinfo = i, e.push(t))
          })
        }), e.sort(function(t, e) {
          var i = t.playinfo,
            r = e.playinfo;
          return i.filesize = parseInt(i.filesize), r.filesize = parseInt(r.filesize), i.filesize > r.filesize ? -1 : i.filesize == r.filesize ? 0 : 1
        });
        var n = !1,
          s = e[e.length - 1];
        e.forEach(function(t) {
          n || r[t.code] <= r[i] && (s = t, n = !0)
        });
        var t = s && s.playinfo;
        var p = this._getHashData(t);
        p && (this.hashId = p.hashid, this.playRequestParam = {
          token: base64_encode(p.token),
          vf: t.vf
        }, t.filename && (this.filename = t.filename));
      },
      _getHashData (t) {
        if(t) {
          for(var e, i, r = 0; !e && r < 2;) {
            if(e = decode(t.infohash), 41 == e.length && /^[0-9a-f]*$/gi.test(e)) {
              for(var o = (e.substr(0, 40), 0), n = 0, a = e.length - 1; n < a; n++) o += parseInt(parseInt(e.substr(n, 1), 16), 10);
              var s = 15 & o;
              s.toString(16).toUpperCase() == e.substr(40) && (i = {
                hashid: e.substr(0, 40),
                token: decode(t.token)
              })
            }
            i || (e = null, t.infohash = t.infohash_prev, t.token = t.token_prev), r++
          }
          return i
        }
      }
    }
  }
</script>
<style>
  .page {
    background: #EAEAEA;
    padding-top:421.875rpx;
  }
  #detailVideo{
    height: 421.875rpx;
    width: 750rpx;
    position:fixed;
    top:0;
    z-index:3;
  }
  .detailCart {
    background: #fff;
    padding: 15rpx 18rpx;
    margin-bottom: 10rpx;
  }

  .playNum {
    font-size: 26rpx;
    color: #7f8c8d;
    line-height: 46rpx;
    text-align: left;
  }

  .mediaTitle {
    display: flex;
    display: -webkit-flex;
    line-height: 56rpx;
  }

  .mediaName {
    font-weight: 800;
    font-size: 33rpx;
    text-align: left;
    flex: 1;
  }

  .mediaDetail {
    font-size: 26rpx;
    color: #7F8C8D;
    width: 150rpx;
    text-align: right;
  }
  .selection{
    /*height: 60rpx;*/
    white-space: nowrap;
  }
  .selection .mediaNums {
    border: 1px solid #eee;
    padding: 0 37.5rpx;
    display: inline-block;
    height: 56.25rpx;
    text-align: center;
    line-height: 56.25rpx;
    margin-right: 10rpx;
  }
  .selection .active{
    color: red;
  }
  .otherList{
    /*height: 250rpx;*/
    white-space: nowrap;
  }
  .otherList .cart{
    width: 300rpx;
    margin-right: 10rpx;
    display: inline-block;
  }
  .otherList .catImg{
    width:300rpx ;
    height: 165.75rpx;
  }
  .otherList .cart-name{
    height: 82rpx;
    line-height: 41rpx;
    overflow: hidden;
  }
  .cart-name .aword {
    font-size: 26rpx;
    color: #7f8c8d;
    -webkit-line-clamp: 1;
  }
  .cart-name .name{
    font-size: 32rpx;
    -webkit-line-clamp: 2;
    white-space: normal;
    display: -webkit-box;
    overflow: hidden;
  }
  .selection::-webkit-scrollbar,.otherList::-webkit-scrollbar,.page.detail::-webkit-scrollbar{
    width: 0px;
    height: 0px;
  }
</style>