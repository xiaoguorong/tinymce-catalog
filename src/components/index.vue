<template>
    <div class="container">
        <el-container>
            <el-header>
                <div class="header">
                    <span><img src="@/assets/arrow_back_gray.png">当前正在查看教案</span>
                    <div class="template-list">
                        <span :class="{'active' : templateIndex == index}" v-for="(item, index) in templateList" :key="index" @click="changeTemplate(index)">模板{{ index }}</span>
                    </div>
                    <div class="btns">
                        <el-button @click="show">查看板书</el-button>
                        <el-button type="primary" plain @click="preview">预览</el-button>
                        <el-button type="primary" plain>导出为word</el-button>
                        <el-button type="primary">保存</el-button>
                    </div>
                </div>
            </el-header>
            <el-main>
                <el-card shadow="never">
                    <Tinymce :value="templateList[templateIndex].content" ref="tinymce"></Tinymce>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Tinymce from "./tinymce.vue";
export default {
    components: {
        Tinymce
    },
    data() {
        return {
            templateList: [{
                id:1,
                content:`<p style="text-align:center;color:red">教案名称</p>
                <p style="text-align:center;">学校：xxx     姓名：xxx</p>
                    <h1>1</h1>
                    <p>#替换这些文字为你的内容</p>
                    <h2>教材分析dddd0</h2>
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
               `
            },{
                id:2,
                content:`<p style="text-align:center;color:red">教111111111111111111案名称</p>
                <p style="text-align:center;">学校：xxx     姓名：xxx</p>
                    <h1>2</h1>
                    <p>#替换这些文字为你的内容</p>
                    <h2>教材分析dddd0</h2>
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
               `
            },
            {
                id:3,
                content:`<p style="text-align:center;color:red">ffffffffffffffffffffff</p>
                <p style="text-align:center;">学校：xxx     姓名：xxx</p>
                    <h1>3</h1>
                    <p>#替换这些文字为你的内容</p>
                    <h2>教材分析dddd0</h2>
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
               `
            }],
            templateIndex: 0
        };
    },
    methods: {
        changeTemplate(index) {
            this.templateIndex = index;
        },
        show() {
            console.log(this.$refs.tinymce.content)
        },
        preview() {
            this.$refs.tinymce.preview()
        }
    }
};
</script>
<style>
.container > .el-container {
    height: 100vh;
}
.container .el-header {
    height: 72px!important;
}
.container .header {
    position: relative;
    height: 72px;
}
.container .header>span{
    font-size: 18px;
    font-weight: 600;
    color: #19203D;
    line-height: 32px;
    top: 24px;
    left: 0;
    position: absolute;
}
.container .header img {
    margin-right: 15px;
    width: 9px;
    height: 16px;
}
.container .template-list {
    width: 100%;
    display: flex;
    justify-content: center;
}
.container .template-list span {
    margin-right: 40px;
    font-size: 20px;
    color: #A7AAB4;
    line-height: 32px;
    margin-top: 25px;
}
.container .template-list .active {
    color: #19203D;
    position: relative;
    font-weight: 600;
}
.container .template-list .active:after {
    width: 50px;
    height: 3px;
    background: #4B71EE;
    position: absolute;
    bottom: -15px;
    left: 0;
    right: 0;
    content: '';
    margin: auto;
}
.container .btns {
    position: absolute;
    right: 0;
    top: 16px;
}
.container .el-main {
    background: #F5F6FA;
}
.container .el-card__body {
    padding: 0;
    height: 100%;
}
.container .el-card {
    height: 100%;
    box-sizing: border-box;
}
</style>
