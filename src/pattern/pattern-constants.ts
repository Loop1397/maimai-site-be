
// 패턴과 관련하여 사용되는 상수배열을 저장해둔 클래스
// import { Constants } from '~~' 의 형태로 사용하면 됨
export abstract class Constants {
    static readonly PATTERN_DIFFICULTIES = ['basic', 'advanced', 'expert', 'master', 're:master']
    static readonly PATTERN_TYPES = ['standard', 'deluxe'];
}