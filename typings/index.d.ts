import Vue from 'vue';

declare type VueNotibar = {
  add: (text: string, options?: VueNotibarOptions) => void;
}

declare type VueNotibarOptions = {
  textColor?: string
    backgroundColor?: string
    time?: number | null
    position?: 'left' | 'center' | 'right'
    dismiss?: {
        show?: boolean
        color?: string
    }
}

declare module 'vue/types/vue' {
  interface Vue {
    $notibar: VueNotibar
  }
}

declare interface VueNotibarPlugin {
  install: (VueConstructor: typeof Vue, options?: VueNotibarOptions) => void;
}

declare const VueNotibar: VueNotibarPlugin;
export default VueNotibar;