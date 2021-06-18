<template>
    <div>
        <div class="box">
            <Catalog
                class="catalog"
                :container="container"
                :catalogList.sync="catalogList"
                :active.sync="active"
                @updateList="updateList"
                @clickTitle="clickTitle"
                @editTitle="editTitle"
                @drop="drop"
                @rise="rise"
                @del="del"
                @addP="addP"
                @addN="addN"
                @addChild="addChild"
                ref="catalog"
            >
            </Catalog>
            <div class="demo" v-html="content"></div>
        </div>
    </div>
</template>
<script>
import Catalog from "./catalog.vue";
export default {
    components: {
        Catalog
    },
    data() {
        return {
            content: `<p style="text-align:center;color:red">教案名称</p>
                <p style="text-align:center;">学校：xxx     姓名：xxx</p>
                    <h1>教材分析0</h1>
                    <p>#替换这些文字为你的内容</p>

                    <h1>教材分析1</h1>
                    <p>#替换这些文字为你的内容</p>

                    <h1>教材分析2</h1>
                    <p>#替换这些文字为你的内容</p>

                    <h1>教材分析3</h1>
                    <p>#替换这些文字为你的内容</p>

                    <h1>教材分析4</h1>
                    <p>#替换这些文字为你的内容</p>
                 <h1>教材分析5</h1>
                    <p>#替换这些文字为你的内容</p>
               `,
            levelList: ["h1", "h2"],
            catalogList: [],
            active: "",
            container: ".demo",
            h1Template: ` <div>
                <h1>教材分析</h1>
                <p>#替换这些文字为你的内容</p>
            </div>`,
            h2Template: ` <div>
                <h1>教材分析</h1>
                <p>#替换这些文字为你的内容</p>
            </div>`,
            oneIndex: 1,
            twoIndex: 1
        };
    },
    created() {
        const that = this;
        tinymce
            .init({
                menubar: false, // 禁用菜单栏
                branding: false, // 隐藏右下角技术支持
                selector: ".demo",
                language: "zh_CN",
                init_instance_callback: function (editor) {
                    editor.on("Change", function (e) {
                        that.content = e.level.content;
                        that.getCatalogList();
                    });
                    editor.on("ScrollContent", function (e) {
                        const scrollTop = e.currentTarget.scrollY;
                        // 到达顶部
                        if (scrollTop === 0) {
                            that.$refs.catalog.initActive();
                            return;
                        }
                        let list = that.catalogList.filter((item) => {
                            return scrollTop >= item.offsetTop;
                        });
                        if (
                            that.getIframeDom().scrollHeight - scrollTop >=
                            iframe.clientHeight
                        ) {
                            list.length > 0
                                ? (that.active = list[list.length - 1].ref)
                                : "";
                        }
                    });
                }
            })
            .then(() => {
                // tinymce.activeEditor.setContent("ddddddddddd");
                this.getCatalogList();
            });
    },
    methods: {
        getIframeDom() {
            const iframe = document.querySelector("#mce_0_ifr");
            const iframeDoc = iframe.contentDocument.querySelector("#tinymce");
            return iframeDoc;
        },
        // 升
        rise(index, title) {
            let newNode = document.createElement("h1");
            newNode.innerText = title;
            let nodeList = this.getTitleDom();
            this.getIframeDom().replaceChild(newNode, nodeList[index]);
            this.getCatalogList();
        },
        // 降
        drop(index, title) {
            let newNode = document.createElement("h2");
            newNode.innerText = title;
            let nodeList = this.getTitleDom();
            this.getIframeDom().replaceChild(newNode, nodeList[index]);
            this.getCatalogList();
        },
        // 删
        del(index) {
            let that = this;
            let nodeList = this.getTitleDom();
            //递归删除下面的
            function fn() {
                if (
                    nodeList[index] &&
                    nodeList[index].nextSibling &&
                    nodeList[index].nextSibling.nodeName != "H1" &&
                    nodeList[index].nextSibling.nodeName != "H2"
                ) {
                    that.getIframeDom().removeChild(
                        nodeList[index].nextSibling
                    );
                    fn(index);
                }
            }
            function fn1() {
                if (
                    nodeList[index] &&
                    nodeList[index].nextSibling &&
                    nodeList[index].nextSibling.nodeName != "H1"
                ) {
                    that.getIframeDom().removeChild(
                        nodeList[index].nextSibling
                    );
                    fn1(index);
                }
            }
            if (nodeList[index].nodeName === "H2") {
                fn();
            }
            if (nodeList[index].nodeName === "H1") {
                fn1();
            }
            this.getIframeDom().removeChild(nodeList[index]);
            this.getCatalogList();
        },
        // 前增
        addP(index) {
            let newNode;
            let nodeList = this.getTitleDom();
            nodeList[index].nodeName === "H1"
                ? (newNode = document.createElement("h1"))
                : (newNode = document.createElement("h2"));
            newNode.innerText =
                nodeList[index].nodeName === "H1"
                    ? "一级目录" + this.oneIndex
                    : "二级目录" + this.twoIndex;
            this.getIframeDom().insertBefore(newNode, nodeList[index]);
            this.getCatalogList();
            nodeList[index].nodeName === "H1"
                ? this.oneIndex++
                : this.twoIndex++;
        },
        addN(index) {
            let that = this;
            let nodeList = this.getTitleDom();
            let newNode;
            if (nodeList[index].nodeName === 'H1') {
                newNode = document.createElement('h1');
                newNode.innerText = '一级目录' + this.oneIndex;
                function fn(i) {
                    if (!nodeList[i + 1]) {
                        that.getIframeDom().appendChild(newNode);
                    } else if (nodeList[i + 1].nodeName === 'H1') {
                        that.getIframeDom().insertBefore(
                            newNode,
                            nodeList[i + 1]
                        );
                    } else {
                        fn(i + 1);
                    }
                }
                fn(index);
                this.oneIndex++;
            } else {
                newNode = document.createElement('h2');
                newNode.innerText = '二级目录' + this.twoIndex;
                function fn(i) {
                    console.log(!nodeList[i + 1]);
                    if (!nodeList[i + 1]) {
                        that.getIframeDom().appendChild(newNode);
                    } else if (
                        nodeList[i + 1].nodeName === 'H2' ||
                        nodeList[i + 1].nodeName === 'H1'
                    ) {
                        that.getIframeDom().insertBefore(
                            newNode,
                            nodeList[i + 1]
                        );
                    } else {
                        fn(i + 1);
                    }
                }
                fn(index);
                this.twoIndex++;
            }
            this.getCatalogList();
        },
        addChild(index) {
            let newNode = document.createElement("h2");
            newNode.innerText = "二级目录" + this.twoIndex;
            let nodeList = this.getTitleDom();
            let that = this;
            function fn(i) {
                if (!nodeList[i + 1]) {
                    that.getIframeDom().appendChild(newNode);
                } else if (nodeList[i + 1].nodeName === "H1") {
                    that.getIframeDom().insertBefore(newNode, nodeList[i + 1]);
                } else {
                    fn(i + 1);
                }
            }
            fn(index);
            this.getCatalogList();
            this.twoIndex++;
        },
        //获取iframe里面的标题dom集合
        getTitleDom() {
            const titleNode = this.getIframeDom().querySelectorAll(
                this.levelList.join(",")
            );
            return titleNode;
        },
        getCatalogList() {
            let titleNode = this.getTitleDom();
            let catalogList = [];
            titleNode.forEach((item, index) => {
                let level = -1;
                this.levelList.forEach((selector, index) => {
                    if (item.matches(selector)) level = index + 1;
                });
                if (level === -1) return;
                const ref = `${item.nodeName}-${index}`;
                catalogList.push({
                    ref,
                    title: item.innerText,
                    offsetTop: item.offsetTop ? item.offsetTop : 0,
                    level: level
                });
            });
            this.catalogList = catalogList;
        },
        //点击目录右边富文本滚动指定位置
        clickTitle(index) {
            const iframe = document.querySelector("#mce_0_ifr");
            const titleNode = this.getTitleDom();
            const top = titleNode[index].offsetTop - 21;
            iframe.contentWindow.scrollTo(0, top);
        },
        editTitle({ index, newTitle }) {
            const titleNode = this.getTitleDom();
            titleNode[index].innerText = newTitle;
        },
        updateList(index, key, value) {
            this.$set(this.catalogList[index], key, value);
        }
    }
};
</script>
<style>
#demo {
    display: none;
}
.box {
    display: flex;
}
.catalog {
    width: 400px;
}
.tox-tinymce {
    flex: 1;
    height: 100vh !important;
}
</style>
