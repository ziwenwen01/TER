import Vue from 'vue'
import {
    Button,
    Popup,
    Icon,
    Cell,
    CellGroup,
    Radio,
    RadioGroup,
    // Circle,
    // CountDown,
    // Progress,
    // Pagination,
    // PasswordInput,
    // NumberKeyboard,
    Loading,
    List,

    Toast,
    // Lazyload,
    Dialog,
} from 'vant'

const VANTModule = {
    Button,
    Popup,
    Icon,
    Cell,
    CellGroup,
    Radio,
    RadioGroup,
    // Circle,
    // CountDown,
    // Progress,
    // Pagination,
    // PasswordInput,
    // NumberKeyboard,
    Loading,
    List,
    Toast,
    // Lazyload,
    Dialog,
};

Toast.setDefaultOptions('loading', {
    forbidClick: true,
    duration: 12000
});

Object.keys(VANTModule).forEach(key => {
    Vue.use(VANTModule[key]);
});
