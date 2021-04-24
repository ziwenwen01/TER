<template>
    <div class="px18">
        <HeaderLogo/>
<!--        <img class="h-20 mt20" src="../assets/img/top_logo.png" alt="">-->
        <div class="f-ct mt50">
            <img class="h-105" src="../assets/img/logo.png" alt="">
        </div>
        <div class="tc f30 fw500 mt40"><!--參與點對點流通獲取回報-->{{ i18n('title1') }}</div>
        <div class="tc f16 fw500 mt05"><!--滿足全球用戶對短期資金的流通需求-->{{ i18n('title2') }}</div>
        <div class="pr ofh mt30">
            <img class="pr full-w" src="../assets/img/total_box.png" alt="">
            <div class="pa-def full-w full-h f-ct">
                <div class="mt-4 f36 fw500 van-ellipsis">${{ countInfo.cardchargesum | filterDecimal(0) }}</div>
            </div>
        </div>
        <div class="tc"><!--全球累計流通總量-->{{ i18n('globalCount') }}</div>
        <div class="flex mt50 tc">
            <div class="flex-1 mr17 h-36 lh36 border-fff" @click="joinWordDlg = true"><!--如何加入-->{{ i18n('howJoin') }}</div>
            <div class="flex-1 mr17 h-36 lh36 border-fff" @click="introductionDlg = true"><!--TURBO介紹-->{{ i18n('TBIntroduce') }}</div>
            <a class="flex-1 h-36 lh36 border-fff c-fff" href="https://github.com/usdtmixer/turbo" target="_blank"><!--公開代碼-->{{ i18n('publicCode') }}</a>
        </div>
        <div class="mt30 br15 px18 py18 bg-fill">
            <div class="f-ct mt20">
                <img class="w-59" src="../assets/img/USDT_TRON.png" alt="">
            </div>
            <div class="tc f20 fw600 mt10">USDT-TRON</div>
            <div class="flex justify-between py20 h-42 c-fff f16 f-wrap">
                <div v-for="(item, index) in productList" :key="index"
                     class="f-30 f-ct border-fff mt10"
                     :class="{'border-sec bg-sec': currentProduct.day === item.day}"
                     @click="productClick(item)">
                    <div>
                        <span class="f18">{{ item.day | filterDecimal(0) }}</span>
                        <span><!--天-->{{ i18n('day') }}</span>
                    </div>
                </div>
                <div class="f-30" style="height: 0;"></div>
            </div>
            <div class="f-c-sb f13 mt35">
                <div class=""><!--流通金額-->{{ i18n('flowCount') }}</div>
                <div class="fw600">{{ currentProduct.limitmin }}～{{ currentProduct.limit }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt16">
                <div class=""><!--流通返回-->{{ i18n('flowBack') }}</div>
                <div class="fw600">{{ currentProduct.rate * 100 | filterDecimal }}%</div>
            </div>
            <div class="mt35">
                <van-button type="primary" class="br6" block v-invite-code="rechargeClick" @click="">
                    <!--參與流通-->{{ i18n('flowJoin') }}
                </van-button>
            </div>
            <div class="py16"></div>
        </div>

        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600"><!--匯總數據-->{{ i18n('totalData') }}</span>
            </div>
            <div class="f-c-sb f13 mt35">
                <div class=""><!--參與地址總量-->{{ i18n('joinAddrCount') }}</div>
                <div class="fw500">{{ countInfo.cardsum | filterDecimal(0) }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class=""><!--參與流通總量-->{{ i18n('joinFlowCount') }}</div>
                <div class="fw500">{{ countInfo.cardchargesum | filterDecimal }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class=""><!--TURBO獎池-->{{ i18n('TBPool') }}</div>
                <div class="fw500">{{ countInfo.cardturbosum | filterDecimal }} USDT</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600"><!--TURBO分享計劃-->{{ i18n('sharePlan') }}</span>
            </div>
            <div class="f-c-sb f13 mt35">
                <div class="f-sk-0 mr10"><!--分享鏈接-->{{ i18n('shareLink') }}</div>
                <div class="flex-1 fw500 van-ellipsis mr10 tr">{{ inviteLink }}</div>
                <div class="f-sk-0 c-1" v-copy="inviteLink"><!--複製-->{{ i18n('copy') }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class=""><!--好友總地址數-->{{ i18n('friendCount') }}</div>
                <div class="fw500">{{ planInfo.invall | filterDecimal(0) }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class=""><!--好友流通總量-->{{ i18n('friendFlow') }}</div>
                <div class="fw500">{{ planInfo.invcharge | filterDecimal }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--直推好友-->{{ i18n('firstFriend') }}</div>
                <div class="flex-1 fw500 van-ellipsis mr10 tr">{{ planInfo.inv | filterDecimal(0) }}</div>
                <div class="f-sk-0 c-1" v-invite-code="() => {this.startFriendDlg = true}" @click=""><!--查看-->{{ i18n('view') }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--2～11代好友-->{{ i18n('otherFriend') }}</div>
                <div class="flex-1 fw500 van-ellipsis mr10 tr">{{ planInfo.inv21 | filterDecimal(0) }}</div>
                <div class="f-sk-0 c-1" v-invite-code="() => {this.otherFriendDlg = true}" @click=""><!--查看-->{{ i18n('view') }}</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600"><!--個人數據統計-->{{ i18n('selfDataTotal') }}</span>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--個人總流通量-->{{ i18n('selfFlowCount') }}</div>
                <div class="flex-1 fw500 van-ellipsis tr">{{ myTotalInfo.fdmUsdtCharge | filterDecimal }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--個人總返回量-->{{ i18n('selfBackCount') }}</div>
                <div class="flex-1 fw500 van-ellipsis tr">{{ myTotalInfo.fdmUsdtReturn | filterDecimal }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--個人分享獎勵-->{{ i18n('selfShare') }}</div>
                <div class="flex-1 fw500 van-ellipsis mr10 tr">{{ myTotalInfo.fdmIncome | filterDecimal }}</div>
                <div class="f-sk-0 c-1" v-invite-code="() => {this.rewardPointDlg = true}" @click=""><!--查看-->{{ i18n('view') }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--個人TER獎勵-->{{ i18n('selfTB') }}</div>
                <div class="flex-1 fw500 van-ellipsis tr">{{ myTotalInfo.fdmReward | filterDecimal }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10"><!--當前個人總盈虧-->{{ i18n('currentSelf') }}</div>
                <div class="flex-1 fw500 van-ellipsis tr">{{ myTotalInfo.fdmProfit | filterDecimal }} USDT</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600"><!--流通記錄-->{{ i18n('flowRecord') }}</span>
            </div>
            <div class="flex mt30 py05">
                <div class="flex-4"><!--流通周期-->{{ i18n('flowDay') }}</div>
                <div class="flex-5 tc"><!--流通→返回-->{{ i18n('flowAndBack') }}</div>
                <div class="flex-6 tr"><!--到期時間-->{{ i18n('toDate') }}</div>
            </div>
            <div v-for="item in flowRecordList" :key="item.ID" class="flex mt16">
                <div class="flex flex-4">
                    <div class="mr10">{{ item.fdiDay }}<!--天-->{{ i18n('day') }}</div>
                    <a class="c-1" target="_blank" :href="Env.transactionHost + item.fdcTxID">{{ i18n('view') }}</a>
                </div>
                <div class="flex-5 f-ct">
                    <span class="mr05">{{ item.fdmAmt | filterDecimal }}</span>
                    <span class="mt-4 mr05">→</span>
                    <span>{{ item.fdmReturn | filterDecimal }}</span>
                </div>
                <div class="flex justify-end flex-6 f12 align-center">{{ item.fddReturn }}</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600"><!--交易地址列表-->{{ i18n('transAddr') }}</span>
            </div>
            <div class="py10"></div>
            <div class="mh100 ofy">
                <div v-for="(item, index) in tradingAddrList" :key="index" class="f-c-sb f13 mt16">
                    <div class="flex-1 fw500 van-ellipsis mr10">{{ item.fdcTel }}</div>
                    <a class="f-sk-0 c-1" target="_blank" :href="Env.transactionAddr + item.fdcTel">{{ i18n('view') }}</a>
                </div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt35 f-sb px12">
            <a class="" href="https://bitpie.com/" target="_blank">
                <img class="w-43" src="../assets/img/bitpie.png" alt="">
                <div class="tc f12 c-fff">Bitpie</div>
            </a>
            <a class="" href="https://www.biki.cc" target="_blank">
                <img class="w-43" src="../assets/img/bik.png" alt="">
                <div class="tc f12 c-fff">bikicoin</div>
            </a>
            <a href="https://www.gateio.tv/" target="_blank" class="">
                <img class="w-43" src="../assets/img/gate.png" alt="">
                <div class="tc f12 c-fff">gate-io</div>
            </a>
            <a href="https://bitkeep.org/" target="_blank" class="">
                <img class="w-43" src="../assets/img/bitkeep.png" alt="">
                <div class="tc f12 c-fff">bitkeep</div>
            </a>
            <a href="https://token.im/" target="_blank" class="">
                <img class="w-43" src="../assets/img/imtoken.png" alt="">
                <div class="tc f12 c-fff">imtoken</div>
            </a>
        </div>

        <div class="flex mt50 px12">
            <a href="https://tronscan.io/#/" target="_blank">
                <img class="h-23 mr20" src="../assets/img/tronscan.png" alt="">
            </a>
            <a href="https://www.tronlink.org/" target="_blank">
                <img class="h-23 mr20" src="../assets/img/tronLink.png" alt="">
            </a>
            <a href="https://tron.network/" target="_blank">
                <img class="h-23" src="../assets/img/tron.png" alt="">
            </a>
        </div>
        <div class="f-ct py25 f12">
            <!--遇到問題-->{{ i18n('meetQuestion') }}：turbo323@gmail.com
        </div>



        <!-- 如何加入 弹框 居中 -->
        <van-popup
                v-model="joinWordDlg"
                :close-on-click-overlay="false"
                class="cus-popup">
            <div class="flex pop-box py25 px18 f13 lh2 f-column">
                <div class="flex-1 ofy">
                    <p class="tc f18 fw500">{{ i18n('howJoin') }}？</p>
                    <div class="mt20">1. {{ i18n('howJoin1') }}</div>
                    <div class="mt14">2. {{ i18n('howJoin2') }}</div>
                    <div class="mt14">3. {{ i18n('howJoin3') }}</div>
                    <div class="mt14">4. {{ i18n('howJoin4') }}：</div>
                    <div>{{ i18n('howJoin4_1') }}</div>
                    <div class="mt14">5. {{ i18n('howJoin5') }}：</div>
                    <div>{{ i18n('howJoin5_1') }}</div>
                    <div>{{ i18n('howJoin5_2') }}</div>
                    <div>{{ i18n('howJoin5_3') }}</div>
                    <div>{{ i18n('howJoin5_4') }}</div>
                    <div>{{ i18n('howJoin5_5') }}</div>
                    <div>{{ i18n('howJoin5_6') }}</div>
                    <div>{{ i18n('howJoin5_7') }}</div>
                </div>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="joinWordDlg = false">
            </div>
        </van-popup>

        <!-- 如何加入 弹框 居中 -->
        <van-popup
                v-model="introductionDlg"
                :close-on-click-overlay="false"
                class="cus-popup">
            <div class="flex pop-box py25 px18 f13 lh2 f-column">
                <div class="flex-1 ofy">
                    <!--<p class="f15">{{ i18n('introHead') }}</p>-->
                    <p class="tc f18 fw500 mt10">{{ i18n('TBIntroduce') }}</p>
                    <div class="mt20">1：{{ i18n('introduce1') }}</div>
                    <div class="mt14">2：{{ i18n('introduce2') }}</div>
                    <div class="mt14">3：{{ i18n('introduce3') }}</div>
                    <div class="mt14">4. {{ i18n('howJoin4') }}：</div>
                    <div>{{ i18n('howJoin4_1') }}</div>
                    <div class="mt14">5. {{ i18n('howJoin5') }}：</div>
                    <div>{{ i18n('howJoin5_1') }}</div>
                    <div>{{ i18n('howJoin5_2') }}</div>
                    <div>{{ i18n('howJoin5_3') }}</div>
                    <div>{{ i18n('howJoin5_4') }}</div>
                    <div>{{ i18n('howJoin5_5') }}</div>
                    <div>{{ i18n('howJoin5_6') }}</div>
                    <div>{{ i18n('howJoin5_7') }}</div>
                </div>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="introductionDlg = false">
            </div>
        </van-popup>

        <!-- 个人分享奖励 弹框 居中 -->
        <van-popup
                v-model="rewardPointDlg"
                :close-on-click-overlay="false"
                @opened="getRewardPoint"
                @closed="popClosedCallback"
                class="cus-popup">
            <div class="flex pop-box py25 px18 f13 lh2 f-column">
                <p class="tc f18 fw500">{{ i18n('selfShare') }}</p>
                <div class="flex py05 mt14 tc">
                    <p class="flex-3"><!--時間-->{{ i18n('time') }}</p>
                    <p class="flex-3"><!--金額-->{{ i18n('money') }}</p>
                    <p class="flex-2"><!--狀態-->{{ i18n('status') }}</p>
                </div>
                <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        class="flex-1 ofy"
                        :oading-text="i18n('loading')"
                        :finished-text="i18n('noMore')"
                        :immediate-check="false"
                        @load="getRewardPoint">
                    <div v-for="item in rewardPointList" :key="item.ID" class="flex mt14 tc f12">
                        <p class="flex-3">{{ item.fddTime }}</p>
                        <p class="flex-3">{{ item.fdmAmt | filterDecimal }}USDT</p>
                        <p class="flex-2">{{ rewardPointStatus[item.fdiState] }}</p>
                    </div>
                </van-list>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="rewardPointDlg = false">
            </div>
        </van-popup>

        <!-- 直推好友 弹框 居中 -->
        <van-popup
                v-model="startFriendDlg"
                :close-on-click-overlay="false"
                @opened="getStartFriend"
                @closed="popClosedCallback"
                class="cus-popup">
            <div class="flex pop-box py25 px18 f13 lh2 f-column">
                <p class="tc f18 fw500">{{ i18n('firstFriend') }}</p>
                <div class="flex py05 mt14 tc">
                    <p class="flex-3"><!--好友地址-->{{ i18n('friendAddr') }}</p>
                    <p class="flex-3"><!--注冊時間-->{{ i18n('regTime') }}</p>
                    <p class="flex-2"><!--流通金額-->{{ i18n('flowCount') }}</p>
                </div>
                <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        class="flex-1 ofy"
                        :oading-text="i18n('loading')"
                        :finished-text="i18n('noMore')"
                        :immediate-check="false"
                        @load="getStartFriend">
                    <div v-for="(item, index) in startFriendList" :key="index" class="flex mt14 tc f12">
                        <p class="flex-3 van-ellipsis">{{ item.fdcTel }}</p>
                        <p class="flex-3 f-sk-0">{{ item.fddRegister.replace(/-/g, '/') }}</p>
                        <p class="flex-2 f-sk-0">{{ item.fdmValue | filterDecimal }}USDT</p>
                    </div>
                </van-list>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="startFriendDlg = false">
            </div>
        </van-popup>

        <!-- 2～11代好友 弹框 居中 -->
        <van-popup
                v-model="otherFriendDlg"
                :close-on-click-overlay="false"
                @opened="getOtherFriend"
                @closed="popClosedCallback"
                class="cus-popup">
            <div class="flex pop-box py25 px18 f13 lh2 f-column">
                <p class="tc f18 fw500"><!--2～11代好友-->{{ i18n('otherFriend') }}</p>
                <div class="flex py05 mt14 tc">
                    <p class="flex-3"><!--好友地址-->{{ i18n('friendAddr') }}</p>
                    <p class="flex-3"><!--注冊時間-->{{ i18n('regTime') }}</p>
                    <p class="flex-2"><!--流通金額-->{{ i18n('flowCount') }}</p>
                </div>
                <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        class="flex-1 ofy"
                        :oading-text="i18n('loading')"
                        :finished-text="i18n('noMore')"
                        :immediate-check="false"
                        @load="getOtherFriend">
                    <div v-for="(item, index) in otherFriendList" :key="index" class="flex mt14 tc f12">
                        <p class="flex-3 van-ellipsis">{{ item.fdcTel }}</p>
                        <p class="flex-3 f-sk-0">{{ item.fddRegister.replace(/-/g, '/') }}</p>
                        <p class="flex-2 f-sk-0">{{ item.fdmValue | filterDecimal }}USDT</p>
                    </div>
                </van-list>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="otherFriendDlg = false">
            </div>
        </van-popup>

        <!-- 充值金额 底部弹框 -->
        <van-popup
                v-model="currencyConfirm"
                closeable
                position="bottom"
                :close-on-click-overlay="false"
                close-icon-position="top-left"
                class="py15 cus-popup-bottom"
                @closed="popClosedCallback">
            <div class="tc f17 fw500"><!--流通金額-->{{ i18n('flowCount') }}</div>
            <div class="px20 mt25">
                <div class="input-box h-50">
                    <input class="mr10" type="number" v-model="currencyValue" :placeholder="i18n('flowCountP')">
                    <span class="f17">USDT</span>
                </div>
                <p class="mt20 lh2"><!--溫馨提示-->{{ i18n('warmPrompt') }}：</p>
                <p class="c-c2c f12 lh2"><!--參與1天流通金額為-->{{ i18n('joinDay', {day: 1}) }} 1～100USDT</p>
                <p class="c-c2c f12 lh2"><!--參與10天流通金額為-->{{ i18n('joinDay', {day: 10}) }} 10～1,000USDT</p>
                <p class="c-c2c f12 lh2"><!--參與30天流通金額為-->{{ i18n('joinDay', {day: 30}) }} 100～3,000USDT</p>
                <p class="c-c2c f12 lh2"><!--參與60天流通金額為-->{{ i18n('joinDay', {day: 60}) }} 100～10,000USDT</p>
                <p class="c-c2c f12 lh2"><!--參與180天流通金額為-->{{ i18n('joinDay', {day: 180}) }} 1,000～20,000USDT</p>
                <div class="py10 mt20">
                    <van-button
                            class="f16"
                            type="primary"
                            block
                            @click="currencyConfirmClick">
                        <div class="f-ct">
                            <van-loading v-if="currencyLoading" color="#ffffff" type="spinner" size="20" class="mr10" />
                            <span><!--確 認-->{{ i18n('conf') }}</span>
                        </div>
                    </van-button>
                </div>
            </div>
        </van-popup>

        <!-- 完善信息 邀请地址 弹框 居中 -->
        <van-popup
                v-model="registerInviteDlg"
                :close-on-click-overlay="false"
                class="cus-popup cus-popup-bottom border-sec br6"
                @closed="popClosedCallback">
            <div class="py25 px16 mx16">
                <p class="tc f18 fw600"><!--完善信息-->{{ i18n('perfectInfo') }}</p>
                <div class="mt30">
                    <div class="f15"><!--請先完善信息再進行後續操作-->{{ i18n('perfectInfoP') }}</div>
                    <div class="input-box mt20 h-44 br6">
                        <input type="text" v-model="sharecode" :placeholder="$t('inviteP')">
                    </div>
                </div>
                <div class="mt20 f15 c-deg">* {{ i18n('perfectInfoTip') }}</div>
                <div class="mt40">
                    <van-button
                            type="primary"
                            block
                            @click="inviteRegisterClick">
                        {{ $t('confirm') }}
                    </van-button>
                </div>
                <div class="f-ct py10 mt10">
                    <span class="c-deg" @click="setRegisterInviteDlg(false)">{{ $t('cancel') }}</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import HeaderLogo from "@/components/HeaderLogo"
    import Env from '../env'
    import { getQueryString, isAddress, deposit, getAccountUsdtBalance } from '../utlis/tron'

    export default {
        name: "home",
        data() {
            return {
                // registerInviteDlg: false,
                sharecode: '',
                productList: [],
                currentProduct: {},
                currencyLoading: false,
                joinWordDlg: false,
                introductionDlg: false,
                rewardPointDlg: false,
                listLoading: false,
                listFinished: false,
                startFriendDlg: false,
                otherFriendDlg: false,
                currencyConfirm: false,
                currencyValue: '',
                myTotalInfo: {},
                planInfo: {},
                countInfo: {},
                pageNum: 0,
                pageSize: 10,
                startFriendList: [],
                otherFriendList: [],
                rewardPointList: [],
                flowRecordList: [],
                tradingAddrList: [],
                postTxIDCount: 0,
            }
        },
        components: {
            HeaderLogo,
        },
        computed: {
            ...mapState(['token', 'registerInviteDlg']),
            inviteLink() {
                return Env.shareUrl + '?code=' + window.tronWeb.defaultAddress.base58;
            },
            rewardPointStatus() {
                return {
                    '1': this.$t('unfinished'),
                    '2': this.$t('finished'),
                }
            },
            Env() {
                return Env;
            },
            i18n() {
                return this.$t;
            }
        },
        activated() {
            this.getIsRegister();
            this.postTxIDCount = 0;
        },
        methods: {
            ...mapMutations({
                setToken: 'SET_TOKEN',
                setUserInfo: 'SET_USER_INFO',
                setRegisterInviteDlg: 'SET_REGISTER_INVITE_DLG',
            }),
            rechargeClick() {
                // this.$toast('暫時無法參與');
                this.currencyConfirm = true;
            },
            pollingTimerInterval() {
                if (!this.token) return;
                let reloadTimer = setInterval(() => {
                    this.getMyTotalInfo();
                    this.getPlanInfo();
                    this.getCountInfo();
                    this.getFlowRecordList();
                    this.getTradingAddrList();
                }, 20e3);
                this.$once('hook:deactivated', () => {
                    clearInterval(reloadTimer);
                });
            },
            async getTradingAddrList() {
                let url = 'mobile/member/joinlist';
                this.tradingAddrList = await this.$http.get(url);
            },
            async getFlowRecordList() {
                let params = {
                    page: 1,
                    num: 100,
                };
                let url = 'mobile/contract/log';
                this.flowRecordList = await this.$http.get(url, { params });
            },
            async getCountInfo() {
                let url = 'mobile/contract/all';
                this.countInfo = await this.$http.get(url);
            },
            async getProductList() {
                let url = 'mobile/contract/days';
                let res = await this.$http.get(url);
                this.currentProduct = res[0] || {};
                this.productList = res;
            },
            async getMyTotalInfo() {
                let url = 'mobile/contract/data';
                this.myTotalInfo = await this.$http.get(url);
            },
            async getPlanInfo() {
                let url = 'mobile/member/frienddata';
                this.planInfo = await this.$http.get(url);
            },
            getOtherFriend() {
                if (!this.pageNum) this.otherFriendList = [];
                this.pageNum ++;
                let params = {
                    deth: 11,
                    page: this.pageNum,
                    num: this.pageSize,
                };
                let url = 'mobile/member/friends';
                this.$http.get(url, { params }).then(res => {
                    this.otherFriendList = this.otherFriendList.concat(res);
                    if (res.length < this.pageSize) this.listFinished = true;
                }).catch(err => {
                    this.listFinished = true;
                });
            },
            getStartFriend() {
                if (!this.pageNum) this.startFriendList = [];
                this.pageNum ++;
                let params = {
                    deth: 1,
                    page: this.pageNum,
                    num: this.pageSize,
                };
                let url = 'mobile/member/friends';
                this.$http.get(url, { params }).then(res => {
                    this.startFriendList = this.startFriendList.concat(res);
                    if (res.length < this.pageSize) this.listFinished = true;
                }).catch(err => {
                    this.listFinished = true;
                });
            },
            getRewardPoint() {
                if (!this.pageNum) this.rewardPointList = [];
                this.pageNum ++;
                let params = {
                    page: this.pageNum,
                    num: this.pageSize,
                };
                let url = 'mobile/contract/rewards';
                this.$http.get(url, { params }).then(res => {
                    this.rewardPointList = this.rewardPointList.concat(res);
                    if (res.length < this.pageSize) this.listFinished = true;
                }).catch(err => {
                    this.listFinished = true;
                });
            },
            postTxID(body) {
                if (this.postTxIDCount > 4) {
                    this.postTxIDCount = 0;
                    return;
                }
                this.postTxIDCount ++;
                let url = 'mobile/contract/updatetxid';
                this.$http.post(url, body).then(r => {
                    this.postTxIDCount = 0;
                    this.$dialog({message: this.$t('rechargeSuc')});
                }).catch(err => {
                    setTimeout(() => {
                        this.postTxID(body);
                    }, 1e3);
                });
            },
            async currencyConfirmClick() {
                let { currencyValue } = this;
                if (!currencyValue) {
                    // this.$toast('請輸入金額');
                    this.$toast(this.$t('moneyP'));
                    return;
                }

                if (+currencyValue < +this.currentProduct.limitmin || +currencyValue > +this.currentProduct.limit) {
                    // this.$toast('金額超出范围');
                    this.$toast(this.$t('bigMoney'));
                    return;
                }
                if (this.currencyLoading) return;
                this.currencyLoading = true;
                let count = await getAccountUsdtBalance();
                if (+currencyValue > +count) {
                    // this.$toast('賬戶餘額不足');
                    this.$toast(this.$t('sellMoney'));
                    this.currencyLoading = false;
                    return;
                }

                this.$http.post('mobile/contract/precreate', {fdiDay: this.currentProduct.day}).then(r => {
                    let fdcNo = r.fdcNo
                    deposit(currencyValue).then(res => {
                        this.postTxID({txID: res, fdcNo: fdcNo});
                    }).catch(err => {
                        this.$dialog({message: this.$t('rechargeFail')});
                    }).finally(() => {
                        this.currencyLoading = false;
                        this.currencyValue = '';
                        setTimeout(() => {
                            this.currencyConfirm = false;
                        }, 300);
                    });
                })


            },
            productClick(item) {
                this.currentProduct = item;
            },
            inviteRegisterClick() {
                let { sharecode } = this;
                if (!sharecode) {
                    this.$toast(this.$t('inviteP'));
                    return;
                }
                if (!isAddress(sharecode)) {
                    // this.$toast('請輸入正確的邀請地址');
                    this.$toast(this.$t('errAddress'));
                    this.sharecode = '';
                    return;
                }
                this.setRegisterInviteDlg(false);
                let url = 'mobile/card/reg';
                let selfAddr = window.tronWeb.defaultAddress.base58;
                let params = {
                    sharecode,
                    phone: selfAddr,
                };
                this.$http.post(url, params).then(res => {
                    this.$toast(this.$t('bindSuc'));
                    this.getIsRegister();
                }).then(err => {

                })
            },
            async getIsRegister() {
                let selfAddr = window.tronWeb.defaultAddress.base58;
                let params = {
                    phone: selfAddr,
                };
                let url = '/mobile/card/login';
                this.$http.post(url, params).then(res => {
                    this.setUserInfo(res.user);
                    this.setToken(res.token);
                    this.getProductList();
                    this.getMyTotalInfo();
                    this.getPlanInfo();
                    this.getCountInfo();
                    this.getFlowRecordList();
                    this.getTradingAddrList();
                    this.pollingTimerInterval();
                }).catch(() => {
                    this.setRegisterInviteDlg(true);
                    this.sharecode = getQueryString('code') || '';
                });
            },
            popClosedCallback() {
               this.listLoading = false;
               this.listFinished = false;
               this.currencyValue = '';
               this.pageNum = 0;
               this.startFriendList = [];
               this.otherFriendList = [];
               this.rewardPointList = [];
            },
            sourceCode() {
                window.location.href = "https://github.com/usdtmixer/turbo";
            }
        }
    }
</script>

<style scoped>
    .mh100 { max-height: 300px; }
    .f-30 { width: 30%; }
</style>
