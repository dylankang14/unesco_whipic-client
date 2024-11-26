export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_REGEX = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/);
export const PASSWORD_REGEX_ERROR = "비밀번호는 문자 숫자 특수문자의 조합으로 6글자 이상으로 입력해주세요";
export const MAX_TOTAL_SIZE = 1 * 1024 * 1024 * 1024; // 1GB
export const MAX_FILES = 5; // 파일 갯수 제한
