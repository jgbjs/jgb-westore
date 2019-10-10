import { JComponent } from 'jgb-weapp';
import { Accessors } from 'jgb-weapp/types/common';
import { PropsDefinition } from 'jgb-weapp/types/JComponent';

type IAnyObject = wxNS.IAnyObject;

export function init(): void;

/**
 * westore 定义的数据结构
 */
interface IStore<D = IAnyObject> {
  data: D;
  [method: string]: Function | IAnyObject;
}

interface IStoreExtensionOptions {
  /**
   * store
   * */
  $store?: IStore;
  /**
   * 使用所有store
   */
  $useAll?: boolean;
}

interface IStoreExtensionInstance {
  /**
   * 更新数据
   * @returns Promise<diff> 返回差异
   */
  $update: (data?: IAnyObject) => Promise<IAnyObject>;
}

declare module 'jgb-weapp/types/JComponent' {
  interface IComponentInstanceExt<Data, Props, Computed>
    extends IStoreExtensionInstance {
    /**
     * store 实例
     **/
    $store: { data: Data & Props & Computed };
  }

  interface JComponentOptions<P, Data, Methods, Props, Computed, Instance>
    extends IStoreExtensionOptions {}
}

declare module 'jgb-weapp/types/JPage' {
  interface IPageOptions extends IStoreExtensionOptions {}
  interface IPageInstanceExt extends IStoreExtensionInstance {}
}

declare module 'jgb-weapp/types/JApp' {
  interface IAppOptions {
    /**
     * store 扩展全局store
     */
    globalStore?: IAnyObject;
  }
}