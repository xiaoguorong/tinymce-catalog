<template>
    <div class="side-catalog">
        <div class="side-catalog__title">目录</div>
        <div class="side-catalog__list">
            <div>
                <i class="side-catalog__list-line"></i>
                <div
                    v-for="(item, index) in catalogList"
                    :key="item.ref"
                    :style="[active === item.ref ? { color: 'blue' } : '']"
                    class="side-catalog__list-item"
                    @click="activeAnchor(item.ref, item.title, index)"
                    @dblclick="editTitle(index)"
                    :class="{
                        'side-catalog__list-item--active': active === item.ref
                    }"
                >
                    <!-- 每行插槽 -->
                    <slot
                        name="row"
                        v-bind:level="item.level"
                        v-bind:isActive="active === item.ref"
                        v-bind:title="item.title"
                    >
                        <!-- 每行icon插槽 -->
                        <slot
                            name="default"
                            v-bind:level="item.level"
                            v-bind:isActive="active === item.ref"
                        >
                            <i
                                class="side-catalog__list-item-icon"
                                :style="
                                    active === item.ref ? { color: 'blue' } : ''
                                "
                            />
                        </slot>
                        <span
                            v-if="!item.canEdit"
                            class="side-catalog__list-item-title"
                            :class="[
                                `side-catalog__list-item-title--level${
                                    item.level || 1
                                }`
                            ]"
                            :title="item.title"
                            :style="[
                                active === item.ref ? { color: 'blue' } : ''
                            ]"
                            >{{ item.title }}</span
                        >
                        &nbsp;<b
                            v-if="item.ref.split('-')[0] == 'H2'"
                            @click.stop="rise(index, item.title)"
                            >升</b
                        >&nbsp;<b
                            v-if="item.ref.split('-')[0] == 'H1'"
                            @click.stop="drop(index, item.title)"
                            >降</b
                        >&nbsp;<b @click.stop="del(index)">删</b>&nbsp;<b
                            @click.stop="addP(index)"
                            >前增</b
                        >&nbsp;<b @click.stop="addN(index)">后增</b>&nbsp;<b
                            v-if="item.ref.split('-')[0] == 'H1'"
                            @click.stop="addChild(index)"
                            >增子</b
                        >
                        <input
                            v-model="item.title"
                            autofocus="autofocus"
                            v-if="item.canEdit"
                            @blur="edit(item.ref, index, item.title)"
                            @click.stop=""
                        />
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
            time: ""
        };
    },
    methods: {
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
        }
    }
};
</script>
<style lang="css" src="./catalog.css"></style>
