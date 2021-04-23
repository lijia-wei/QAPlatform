<template>
  <div class="box">
		<mainav/>
    <div class="title">
			<img src="../assets/images/about/title.jpg">
		</div>
		
		<div class="content-wrapper">
			<div class="content">
				<div class="intro">
					<div class="intro-title">
						<h2>功能介绍</h2>
					</div>
					<ul class="intro-content">
						<li>
							<img src="../assets/images/about/Online presentation_Flatline.png" />
							<div class="block-title">提出问题</div>
							<div class="block-content">在这里，你可以向广大网友提出宝贵的疑问，并收到真诚的解答</div>
						</li>
						
						<li>
							<img src="../assets/images/about/Search engine _Flatline.png" />
							<div class="block-title">寻找解答</div>
							<div class="block-content">在这里，你可以寻找到他人的疑问和解答，找到不一样的惊喜</div>
						</li>

					</ul>
					<ul class="intro-content">
						<li>
							<img src="@/assets/images/about/Brainstorming session _Flatline.png" />
							<div class="block-title">头脑风暴</div>
							<div class="block-content">在这里，你可以和大家一起发动头脑风暴，共同解答互相的难题</div>
						</li>
						
						<li>
							<img src="@/assets/images/about/PR_Flatline.png" />
							<div class="block-title">扩列交友</div>
							<div class="block-content">在这里，你可以交到志同道合的朋友，扩展自己的交际圈</div>
						</li>
					</ul>
				</div>
				<div class="aboutus">
					<h2>关于我们</h2>
				</div>
				<div class="embeded-logo">
					<img src="@/assets/images/about/团队logo.gif">
					<div class="embeded-logo-content">嵌入式团队成立于2010年，是计科院最早成立的团队之一。
					团队最早以嵌入式开发为核心，到目前涵盖了嵌入式开发、后端开发、前端开发、机器学习、移动应用开发等方向，
					使用但不限于C/C++、Java、Python、JS、Python、Go等编程语言。</div>
				</div>
				<div class="end-words">网站创立于2021年，致力于打造面向全球的中文问答平台，为用户提供优质的问答内容。</div>
				<div class="end-words">我们鼓励原创，鼓励分享，尊重回答者的利益。我们希望将价值分享到你们的生活，也希望你们分享生活中的价值。</div>
			</div>
		</div>
		<foot/>
  </div>
</template>

<script>
import foot from "@/components/content/foot";
import mainav from "@/components/content/mainav";
export default {
	name: "About",
	components: {
    foot,
    mainav,
  },
}
</script>

<style scoped>
.title{
				margin-top: 0px;
				height: 200px;
				width: 100%;
			}
			
			.title img{
				z-index: -1;
				width: 100%;
			}
			
			.content-wrapper {
				width: 1000px;
				margin: 0 auto;
			}

			.content {
				position: relative;
			}
			
			.intro {
				margin-top: 0px;
				height: 800px;
			}
			
			.intro-title {
				display: inline;
				background-color: white;
			}
			
			.intro-title h2 {
				font-size: 36px;
				color: white;
			}
			
			.intro-content {
				display: block;
				margin: 0 auto;
				width: 800px;
				height: 400px;
				padding: 1px 0;
			}
	
			
			.intro-content li {
				list-style: none;
				display: inline-block;
				margin: 0 98px;
				width: 200px;
				height: 300px;
			}
			
			.intro-content li img:hover{
				margin-top: -100px;
				width: 250px;
				float: left;
			}
			.intro-content li img {
				width: 100%;
				transition: .3s;
			}
			
			.intro-content li .block-title {
				font-size: 24px;
				color: rgb(12,105,191);
				margin-bottom: 10px;
			}
			
			.intro-content li .block-content {
				font-size: 14px;
			}
			
			.aboutus {
				margin-top: 100px;
				width: 400px;
			}
			
			.aboutus:hover > h2::after{
				width: 900px;
			}
			
			.aboutus h2{
				font-size: 32px;
				margin-left: 50px;
			}
			
			.aboutus h2::after {
				content: "";
				display: block;
				width: 400px;
				border-top: 2px solid rgba(0,0,0, .3);
				transition: .3s;
			}
			
			.embeded-logo {
				margin: 50px;
				margin-bottom: 100px;
			}
			.embeded-logo img {
				width: 300px;
			}
			
			.embeded-logo-content {
				width: 400px;
				height: 100px;
				color: rgba(0,0,0,.5);
				float: right;
				transition: 0.3s;
			}
			
			.embeded-logo-content:hover {
				color: black;
			}
			
			.end-words {
				line-height: 50px;
				font-size: 18px;
			}
</style>