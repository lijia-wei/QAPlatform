<template>
  <div class="main-content-space">
				<div class="main-content-space-title">我的问答</div>
				<!-- <div class="main-content-block">
					<div class="main-content-block-title">
						<a href="">《大卫》一课中： “这一切是那么美丽，简直是一幅图画！”句中的“这一切”是指什么？这句话又表达了什么?</a>
					</div>
					<div class="main-content-block-date">问题日期：2021/3/12</div>
				</div>

				<div class="main-content-block">
					<div class="main-content-block-title">
						<a href="">在电影《阿凡达》中有什么科技特效？</a>
					</div>
					<div class="main-content-block-date">问题日期：2021/3/12</div>
				</div>

				<div class="main-content-block">
					<div class="main-content-block-title">
						<a
							href="">千百年来，“日出而作，日落而息”，是人类生活劳作的基本自然规律。然而，现代社会节奏紧张，夜生活丰富，人们的睡眠时间也随之越推越迟；尤其年轻人自恃身强体壮，肆无忌惮透支健康。然而，近几年来频发的投行女、IT男、高管猝死事件，就为熬夜人群敲响了警钟。那么，长期熬夜的危害有多严重呢？</a>
					</div>
					<div class="main-content-block-date">问题日期：2021/3/12</div>
				</div> -->

        <q-a-module :post="{ title: '标题', content: '内容啦啦啦啦啦', create_time: '2021/4/9'}"></q-a-module>
			</div>
</template>

<script>
import QAModule from '@/components/common/QAModule'
export default {
  name: 'UserSpace',
  components: {
    QAModule
  }
}
</script>

<style>

</style>