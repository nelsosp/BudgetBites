//
//  Budget_BitesApp.swift
//  Budget Bites
//
//  Created by Spencer Nelson on 2/22/24.
//

import SwiftUI
import Firebase
//import FirebaseCore

@main
struct Budget_BitesApp: App {
    
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

    
    var body: some Scene {
        WindowGroup {
            HomePageView()
        }
    }
}


class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()
    return true
  }
}
