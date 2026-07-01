/**
 * 性能相关辅助函数
 * 用于在不改变视觉的前提下，对移动端/低性能设备做降级优化。
 */

let _mobile: boolean | null = null;
let _lowPower: boolean | null = null;

/** 检测是否为触摸/小屏设备 */
export function isMobileDevice(): boolean {
  if (_mobile !== null) return _mobile;
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    _mobile = false;
    return _mobile;
  }
  const ua = navigator.userAgent;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isSmallScreen = window.innerWidth < 768;
  _mobile = (isTouch && isMobileUA) || (isMobileUA && isSmallScreen);
  return _mobile;
}

/** 检测是否应使用低功耗/兼容渲染模式 */
export function isLowPowerMode(): boolean {
  if (_lowPower !== null) return _lowPower;
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    _lowPower = false;
    return _lowPower;
  }
  const ua = navigator.userAgent;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const isSafariLike = /iP(hone|ad|od)|Safari/.test(ua) && !/Chrome|CriOS|Fxios/.test(ua);
  const lowMemory = typeof memory === "number" && memory <= 4;
  const batterySave = (navigator as Navigator).connection?.saveData === true;
  _lowPower = isMobileDevice() && (isSafariLike || lowMemory || batterySave || window.innerWidth < 640);
  return _lowPower;
}

/** 清除缓存（主要用于测试） */
export function clearPerfCache() {
  _mobile = null;
  _lowPower = null;
}
