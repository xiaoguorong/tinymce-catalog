<template>
    <div class="side-catalog">
        <div class="title">目录</div>
        <div class="side-catalog__list">
            <div v-for="(item, index) in catalogList" :key="index">
                <div
                    v-if="item.level == 1 || !item.display"
                    :style="[active === item.ref ? { color: 'blue' } : '']"
                    @click="activeAnchor(item.ref, item.title, index)"
                    @dblclick="editTitle(index)"
                    @contextmenu.prevent.stop="rightClick(item, index)"
                    :class="{
                        'side-catalog__list-item--active': active === item.ref,
                        'catalog__list-h1': item.level === 1,
                        'catalog__list-h2': item.level === 2,
                    }"
                >
                    <div class="line"></div>
                    <img v-if="item.level === 1 && catalogList[index+1] && catalogList[index+1].level === 2" :src="item.switch ? closeIcon : openIcon" @click="shrink(item, index)">
                    <span :style="{'margin-left': !(item.level === 1 && catalogList[index+1] && catalogList[index+1].level === 2) ? '6px' : ''}"><i v-if="item.level === 2"></i>{{ item.title }}</span>
                    <div v-click-outside="hide">
                        <el-popover
                            placement="top"
                            width="160"
                            offset="100"
                            :value="item.showMenus">
                            <div class="btn-list">
                                <p v-if="item.ref.split('-')[0] == 'H2'" @click.stop="rise(index, item.title)"><img src="@/assets/icon_shengji_rest.png"><span>升级</span></p>
                                <p v-if="item.ref.split('-')[0] == 'H1'" @click.stop="drop(index, item.title)"><img src="@/assets/icon_jiangji_rest.png"><span>降级</span></p>
                                <p @click.stop="del(index)"><img src="@/assets/icon_delete_rest.png"><span>删除</span></p>
                                <p @click.stop="addP(index)"><img src="@/assets/icon_qianfang_rest.png"><span>前方新增同级目录</span></p>
                                <p @click.stop="addN(index)"><img src="@/assets/icon_houfang_rest.png"><span>后方新增同级目录</span></p>
                                <p v-if="item.ref.split('-')[0] == 'H1'" @click.stop="addChild(index)"><img src="@/assets/icon_zimulu_rest.png"><span>后方新增子目录</span></p>
                            </div>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import openIcon from '@/assets/btn_zhankai.png'
import closeIcon from '@/assets/btn_shouqi.png'
export default {
    name: "SideCatalog",
    props: {
        container: {
            type: String,
            required: true
            // default: ""
        },
        levelList: {
            type: Array,
            default() {
                return ["h1", "h6", "h2", "h3", "h4", "h5"];
            }
        },
        catalogList: {
            type: Array,
            default() {
                return [];
            }
        },
        active: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            time: "",
            openIcon,
            closeIcon,
            visible: true
        };
    },
    directives: {
        ClickOutside
    },
    methods: {
        hide() {
            this.catalogList.map((v, i) => {
                this.$emit("updateList", i, "showMenus", false);
            })
        },
        rightClick(item, index) {
            this.catalogList.map((v, i) => {
                this.$emit("updateList", i, "showMenus", false);
            })
            this.$emit("updateList", index, "showMenus", !item.showMenus);
        },
        rise(index, title) {
            this.$emit("rise", index, title);
        },
        drop(index, title) {
            this.$emit("drop", index, title);
        },
        del(index) {
            this.$emit("del", index);
        },
        addP(index) {
            this.$emit("addP", index);
        },
        addN(index) {
            this.$emit("addN", index);
        },
        addChild(index) {
            this.$emit("addChild", index);
        },
        // 点击title
        activeAnchor(ref, title, index) {
            clearTimeout(this.time); //首先清除计时器
            this.time = setTimeout(() => {
                console.log("单机");
                this.$emit("clickTitle", index);
                this.$emit("update:active", this.catalogList[index].ref);
            }, 300);
        },
        editTitle(index) {
            clearTimeout(this.time);
            this.$emit("updateList", index, "canEdit", true);
        },
        edit(ref, index, newTitle) {
            this.$emit("updateList", index, "canEdit", false);
            this.$emit("editTitle", { ref, index, newTitle });
        },
        initActive(last) {
            if (!this.catalogList.length) return;
            const index = last ? this.catalogList.length - 1 : 0;
            this.$emit("update:active", this.catalogList[index].ref);
        },
        shrink(item, index) {
            this.$emit("updateList", index, "switch", !item.switch);
            this.catalogList.map((v,i) => {
                if(i > index && v.level === 2) {
                    this.$emit("updateList", i, "display", !v.display);
                }
            })
        }
    }
};
</script>
<style lang="css" src="./catalog.css" scoped></style>
