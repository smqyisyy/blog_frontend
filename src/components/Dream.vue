<!-- 我的梦想卡片组件 -->
<template>
    <div class="dream-card">
        <div class="dream-title-containter">
            <font-awesome-icon icon="fa-regular fa-lightbulb" />
            <span class="dream-title">{{ dreamTile }}</span>
        </div>
        <span class="dream-content">{{ dreamContent }}</span>
    </div>
</template>
<script>
export default {
    props: {
        dreamTile: {
            default: "我的梦想"
        },
        dreamContent: {
            default: "不是每个人都应该像我这样去建造一座水晶大教堂，但是每个人都应该拥有自己的梦想，设计自己的梦想，追求自己的梦想，实现自己的梦想。梦想是生命的灵魂，是心灵的灯塔，是引导人走向成功的信仰。有了崇高的梦想，只要矢志不渝地追求，梦想就会成为现实，奋斗就会变成壮举，生命就会创造奇迹。——罗伯·舒乐"
        }
    },
    setup(props) {
        let dreamTile = props.dreamTile
        let dreamContent = props.dreamContent
        return {
            dreamTile,
            dreamContent
        }
    }
}
</script>

<style scoped>
.dream-card {
    border-radius: 10px;
    color: black;
    background-color: #fff;
    padding: 20px 40px;

}

.dream-card .dream-title-containter {
    text-align: center;
    font-size: 30px;
    margin: 30px 0;
    font-weight: 700;
}

.dream-card .dream-title-containter .dream-title {
    margin: 0 10px;

}
.dream-card .dream-content {
    color:rgb(150,150,150) ;
    width: 60%;
    display: block;
    text-align: center;
    margin: 30px auto;
    font-size: 16.5px;
    line-height: 1.5;
}

</style>