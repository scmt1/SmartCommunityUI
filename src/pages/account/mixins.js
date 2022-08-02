import iHeaderI18n from '@/layout/header-i18n';
import { mapState } from 'vuex';

export default {
    components: { iHeaderI18n },
    computed: {
        ...mapState('admin/layout', [
            'showI18n'
        ])
    }
}
