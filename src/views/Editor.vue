<template>
  <el-row @keydown.ctrl.83.native="(e)=>{submitCtl(e)}">
    <el-row class="header">
      <el-col :span="12">
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          ref="upload"
          :on-change="handleChange"
          :limit="fileLimit"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :show-file-list="false">
          <el-button slot="trigger" size="small" type="primary">选取MD文件</el-button>
          <span slot="tip" class="el-upload__tip">只能上传MD文件
            <span v-show="last_filename ? true:false">
              （<span style="color: red">{{last_filename}}</span>）
            </span>
          </span>
        </el-upload>
      </el-col>
      <el-col :span="12" class="headerRight">
        <el-radio-group v-model="radio1">
          <el-radio-button label="默认模板"></el-radio-button>
          <el-radio-button label="简历模板"></el-radio-button>
        </el-radio-group>
        <el-button-group class="marginLeft15">
          <!--          <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
          <el-button title="保存" type="primary" icon="el-icon-document-checked" circle @click="submit"></el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row>

      <mavon-editor
        v-model="content"
        ref="md"
        @change="change"
        style="height: 800px;"
        @imgAdd="$imgAdd"
        :toolbars="configs"
        class="marginTop15"
      />

    </el-row>
  </el-row>
</template>

<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { saveAs } from '../../public/common'

export default {
  name: 'Editor',
  // 注册
  components: {
    mavonEditor
  },
  props: ['fmarkdownOption'],
  data: function () {
    return {
      last_filename: '',
      fileLimit: 1,
      radio1: '默认模板',
      defaultContent: '',
      content: '',
      cvContent: '\n' +
        '# 个人信息\n' +
        '\n' +
        ' - 冷熊/男/1990 \n' +
        ' - 本科/北极大学计算机系 \n' +
        ' - 工作年限：3年\n' +
        ' - 微博：[@Easy](http://weibo.com/easy) （如果没有技术相关内容，也可以不放）\n' +
        ' - 技术博客：http://old.ftqq.com ( 使用GitHub Host的Big较高  )\n' +
        ' - Github：http://github.com/easychen ( 有原创repo的Github帐号会极大的提升你的个人品牌  )\n' +
        '\n' +
        ' - 期望职位：PHP高级程序员，应用架构师\n' +
        ' - 期望薪资：税前月薪15k~20k，特别喜欢的公司可例外\n' +
        ' - 期望城市：北京\n' +
        '\n' +
        '\n' +
        '# 联系方式\n' +
        '\n' +
        '（HR会打印你的简历，用于在面试的时候联系，所以联系方式放到最上边会比较方便）\n' +
        '\n' +
        '- 手机：135.... （如果是外地手机，可注明。如经常关机，要写上最优联系时间）\n' +
        '- Email：goodman@gmail.com （虽然我觉得QQ邮箱无所谓，不过有些技术人员比较反感，建议用G，非要用的话，不要用数字邮箱名）\n' +
        '- QQ/微信号：6...（提供一个通过网络可以联系到你的方式）\n' +
        '\n' +
        '\n' +
        '# 技能清单\n' +
        '（我一般主张将技能清单写入到工作经历里边去。不过很难完整，所以有这么一段也不错）\n' +
        '\n' +
        '以下均为我熟练使用的技能\n' +
        '\n' +
        '- Web开发：PHP/Hack/Node\n' +
        '- Web框架：ThinkPHP/Yaf/Yii/Lavarel/LazyPHP\n' +
        '- 前端框架：Bootstrap/AngularJS/EmberJS/HTML5/Cocos2dJS/ionic\n' +
        '- 前端工具：Bower/Gulp/SaSS/LeSS/PhoneGap\n' +
        '- 数据库相关：MySQL/PgSQL/PDO/SQLite\n' +
        '- 版本管理、文档和自动化部署工具：Svn/Git/PHPDoc/Phing/Composer\n' +
        '- 单元测试：PHPUnit/SimpleTest/Qunit\n' +
        '- 云和开放平台：SAE/BAE/AWS/微博开放平台/微信应用开发\n' +
        '      \n' +
        '---      \n' +
        '# 工作经历\n' +
        '（工作经历按逆序排列，最新的在最前边，按公司做一级分组，公司内按二级分组）\n' +
        '\n' +
        '## ABC公司 （ 2012年9月 ~ 2014年9月 ）\n' +
        '\n' +
        '### DEF项目 \n' +
        '我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。\n' +
        '\n' +
        '\n' +
        '### GHI项目 \n' +
        '我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。\n' +
        '\n' +
        '\n' +
        '### 其他项目\n' +
        '\n' +
        '（每个公司写2~3个核心项目就好了，如果你有非常大量的项目，那么按分类进行合并，每一类选一个典型写出来。其他的一笔带过即可。）\n' +
        '\n' +
        '  \n' +
        '## JKL公司 （ 2010年3月 ~ 2012年8月 ）\n' +
        '\n' +
        '### MNO项目 \n' +
        '我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。\n' +
        '\n' +
        '\n' +
        '### PQR项目 \n' +
        '我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。\n' +
        '\n' +
        '\n' +
        '### 其他项目\n' +
        '\n' +
        '（每个公司写2~3个核心项目就好了，如果你有非常大量的项目，那么按分类进行合并，每一类选一个典型写出来。其他的一笔带过即可。）\n' +
        '  \n' +
        '  \n' +
        '# 开源项目和作品\n' +
        '（这一段用于放置工作以外的、可证明你的能力的材料）\n' +
        '\n' +
        '## 开源项目\n' +
        '（对于程序员来讲，没有什么比Show me the code能有说服力了）\n' +
        '\n' +
        '  - [STU](http://github.com/yourname/projectname)：项目的简要说明，Star和Fork数多的可以注明\n' +
        '  - [WXYZ](http://github.com/yourname/projectname)：项目的简要说明，Star和Fork数多的可以注明\n' +
        '\n' +
        '## 技术文章\n' +
        '（挑选你写作或翻译的技术文章，好的文章可以从侧面证实你的表达和沟通能力，也帮助招聘方更了解你）\n' +
        '\n' +
        '- [一个产品经理眼中的云计算：前生今世和未来](http://get.jobdeer.com/706.get)\n' +
        '- [来自HeroKu的HTTP API 设计指南(翻译文章)](http://get.jobdeer.com/343.get) （ 好的翻译文章可以侧证你对英文技术文档的阅读能力）\n' +
        '\n' +
        '## 演讲和讲义\n' +
        '（放置你代表公司在一些技术会议上做过的演讲，以及你在公司分享时制作的讲义）\n' +
        '\n' +
        '  - 2014架构师大会演讲：[如何通过Docker优化内部开发](http://ftqq.com)\n' +
        '  - 9月公司内部分享：[云计算的前生今世](http://ftqq.com)\n' +
        '    \n' +
        '    \n' +
        '# 致谢\n' +
        '感谢您花时间阅读我的简历，期待能有机会和您共事。\n' +
        '      ',
      html: '',
      configs: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      const formdata = new FormData()

      this.$upload.post('/上传接口地址', formdata).then(res => {
        console.log(res.data)
        this.$refs.md.$img2Url(pos, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    handleChange (file) {
      // console.log(file)
      // console.log(file.type)
      // console.log(file.size)

      const reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        console.log('您的浏览器不支持文件读取')
        return
      }

      reader.readAsText(file.raw, 'utf-8')
      console.log(reader)
      const _this = this
      reader.onload = function (e) {
        _this.content = e.target.result
      }
      // console.log(file.name)
      _this.last_filename = file.name
    },
    handleExceed (files, fileList) {
      console.log(`当前限制选择 ${this.fileLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit () {
      // console.log(this.content)
      // console.log(this.html)
      if (this.content) { saveAs(this.$refs.md, 'filename.md') } else {
        console.log('文件空！')
      }
    },
    submitCtl (e) {
      // e.preventDefault()
      // this.$refs.inppp.blur()
      // console.log(e)
      this.submit()
    }
  },
  watch: {
    radio1: {
      handler (val, oldVal) {
        console.log('watch radio1 handler')
        if (val === '默认模板') {
          this.cvContent = this.content
          this.content = this.defaultContent
        } else {
          this.defaultContent = this.content
          this.content = this.cvContent
        }
      }
    }
  },
  mounted () {
    for (const ob in this.fmarkdownOption) {
      this.configs[ob] = this.fmarkdownOption[ob]
    }
  },
  beforeUpdate: function () {
    // console.log(this.fmarkdownOption)
    console.log('beforeUpdate')
  },
  updated () {
    // console.log(this.fmarkdownOption)
    console.log('updated')
  }
}
</script>

<style scoped>
.width200{
  width: 200px;
}
.marginTop15{
  margin-top: 15px;
}
.marginLeft15{
  margin-left: 15px;
}
.cvHeader{
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  color: black;
  font-size: 20px;
}
.el-upload-list {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 400px;
}
.header{
  height: 70px;
}
.headerRight{
  line-height: 70px;
  text-align: right;
  padding-right: 30px;
}
.upload{
  margin-left: 30px;
  margin-top: 15px;
}
.el-upload__tip{
  margin-left: 10px;
}
</style>
