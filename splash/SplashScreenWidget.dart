

import 'package:flutter/material.dart';
import 'package:fs_app/routes/app_routes.dart';
import 'package:fs_app/services/shared_preference_service.dart';
import 'package:get/get.dart';
import 'components/body.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin{
  @override
  Widget build(BuildContext context) {
    Future.delayed(const Duration(seconds: 3)).then((value) {
      SharedPreferenceService preferenceService =
      Get.find<SharedPreferenceService>();
      if (preferenceService.getAuthToken() != null &&
          (preferenceService.getAuthToken()?.isNotEmpty ?? false)) {
        Get.offAndToNamed(AppRoute.login);
      } else {
        Get.offAndToNamed(AppRoute.onboarding);
      }
    });

    late final AnimationController _controller = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat(reverse: true);
    late final Animation<double> _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
    );

    @override
    void dispose() {
      _controller.dispose();
      super.dispose();
    }

    return Body();
  }
}


