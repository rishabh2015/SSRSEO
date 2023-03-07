import 'package:flutter/material.dart';
import 'package:fs_app/constant/color_const.dart';

class Body extends StatefulWidget{
  @override
  _BodyState createState() => _BodyState();
}
class _BodyState extends State<Body> {
  @override
  Widget build(BuildContext context){
    return Container(
      constraints: BoxConstraints.expand(),
      decoration: const BoxDecoration(
        image: DecorationImage(
            image: AssetImage("assets/images/bg1.jpg"),
            fit: BoxFit.cover),
      ),
      child: Align(
        alignment: Alignment.center,
        child: Text(
          'FACTORY OS',
          style:TextStyle(fontSize: 36, color: ColorConst.splash_grey,
              fontWeight : FontWeight.w700),
          textAlign: TextAlign.center,

        )
      )
    );
  }
}