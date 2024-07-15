
// 패턴과 관련하여 사용되는 상수배열을 저장해둔 클래스
// import { Constants } from '~~' 의 형태로 import하면 됨
export abstract class PatternConstants {
    // 패턴 난이도
    static readonly PATTERN_DIFFICULTIES = ['basic', 'advanced', 'expert', 'master', 're:master']

    // 패턴 타입
    static readonly PATTERN_TYPES = ['standard', 'deluxe'];

    // 패턴 버전
    static readonly PATTERN_VERSIONS = ["maimai", "maimai+", "GreeN", "GreeN+", "ORANGE", "ORANGE+", "PiNK", "PiNK+", "MURASAKi", "MURASAKi+", "MiLK", "MiLK+", "FiNALE", "DX", "DX+", "Splash", "Splash+", "UNiVERSE", "UNiVERSE+", "FESTiVAL", "FESTiVAL+", "BUDDiES", "BUDDiES+"]
}