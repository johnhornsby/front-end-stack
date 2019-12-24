/**
 * In an attempt to reduce boiler plate in creation of dynamically loading components.
 * To use add an export utilising the create function helper.
 *
 * const [NAME USED IN data-component=""] = create(() => /* webpackChunkName: "[NAME OF EXPORTED JS FILE]" /'[PATH TO COMPONENT]' );
 */

import DynamicInViewFactory from '../../util/dynamic-in-view-factory'; // wraps up the import to load on scrolling into view

const create = (func: () => Promise<any>, options = {}, triggerImmediately = false) =>
  DynamicInViewFactory.create(func, options, triggerImmediately); // purely to reduce line length

export const DynamicWidget = create(() =>
  import(/* webpackChunkName: "DynamicWidget" */ '../modules/DynamicWidget')
);
