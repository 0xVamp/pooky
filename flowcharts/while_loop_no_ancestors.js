function do_while_loop(){
  var state = 3;
  for (; state !== 99; ) {
    switch (state) {

      case 3:
        state = !0 ? 4 : 7;
        break;

      case 4:
        state = 5;
        break;

      case 5:
        state = 6;
        break;

      case 6:
        state = 3
        break;

      case 7:
        state = 8;
        break;

      case 8:
        state = 9;
        break;

      case 9:
        state = 10;
        break;

      case 10:
        return !0;
        break;
    }
  }
}