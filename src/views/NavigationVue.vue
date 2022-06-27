<template>
    <nav class="navbar navbar-light bg-secondary">
        <div class="container py-1">
            <slot name="title">Vue</slot>
            <div class="d-flex">
                <slot name="action"></slot>
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>