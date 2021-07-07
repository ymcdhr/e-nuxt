<template>
    <nav>
        <ul class="pagination">
            <li
            :class="`page-item ${item === page?'active':''}`"
            v-for="item in totalPage"
            :key="item"
            >
            <nuxt-link
                class="page-link"
                :to="{
                    name: route || 'home',
                    query: {
                        page: item,
                        tag: tag,
                        tab: tab
                    }
                }"
            >{{ item }}</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        page: {
            type: Number,
            required: true
        },
        tab: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: false
        },
        totalPage:{
            type: Number,
            required: true
        },
        route: {
            type: String,
            required: false
        }
    }
}
</script>

<style>

</style>