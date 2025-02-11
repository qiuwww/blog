<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">
        <Dropdown :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-i18n" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
            <Icon type="md-globe" />
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, key) in languages" :key="key" :name="key" :selected="locale === key">
                    <span>{{ item.language }}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </span>
</template>
<script>
    import Languages from '@/i18n/locale';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'iHeaderI18n',
        data () {
            return {
                languages: Languages
            }
        },
        computed: {
            ...mapState('i18n', [
                'locale'
            ]),
            ...mapState('layout', [
                'isMobile'
            ])
        },
        methods: {
            ...mapActions('i18n', [
                'setLocale'
            ]),
            handleClick (locale) {
                if (locale === this.locale) return;
                this.setLocale({ locale, vm: this });
            }
        }
    }
</script>
