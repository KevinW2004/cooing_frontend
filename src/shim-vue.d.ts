// 一个TypeScript声明文件，用于告诉TypeScript编译器如何处理`.vue`文件。这是Vue3和TypeScript集成的一部分。

declare module '*.vue' {
    import { defineComponent } from 'vue'
    constcomponent: ReturnType<typeof defineComponent>
    export default component
}
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

