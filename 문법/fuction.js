function 문자출력함수(문자) {
    console.log('문자출력함수' + 문자);
}
문자출력함수('a');

// 매개변수가 하나인 경우 소괄호를 없앤다.
// 함수 body가 return문 하나이건, 한 줄일 때 중활호{}를 없앤다. 
문자출력익명함수 = function(문자) {
    console.log('문자출력익명함수' + 문자);
}
문자출력익명함수('swag'); 