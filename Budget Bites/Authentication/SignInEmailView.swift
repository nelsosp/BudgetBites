//
//  SignInEmailView.swift
//  Budget Bites
//
//  Created by Spencer Nelson on 2/25/24.
//

import SwiftUI

@MainActor
final class SignInEmailViewModel: ObservableObject {
    
    @Published var email = ""
    @Published var password = ""
    
//    add validaion?
    func signIn() {
        guard !email.isEmpty, !password.isEmpty else {
            print("No email or password found.")
            return
        }
        
        Task {
            do {
                let returnedUserData = try await AuthenticationManager.shared.createUser(email: email, password: password)
                print("Success")
                print(returnedUserData)
                
            } catch {
                print("Error: \(error)")
            }
        }
    }
    
}

struct SignInEmailView: View {
    
    @State private var full_name: String = ""
    @State private var confirm_password: String = ""

    @StateObject private var viewModel = SignInEmailViewModel()
    
    var body: some View {
        
        VStack() {
            Text("Budget Bites")
                .padding()
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            
            
            VStack() {
                Text("Login/Register")
                    .foregroundColor(.white)

                TextField("Full Name", text: $full_name)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .multilineTextAlignment(.center)
                    .padding()
//                    .background(Color.gray.opacity(0.4))
//                    .cornerRadius(10)
                
                TextField("Email..", text: $viewModel.email)
                    .textFieldStyle (RoundedBorderTextFieldStyle())
                    .multilineTextAlignment(.center)
                    .padding()
//                    .background(Color.gray.opacity(0.4))
//                    .cornerRadius(10)
                
                SecureField("Password..", text: $viewModel.password)
                    .textFieldStyle (RoundedBorderTextFieldStyle())
                    .multilineTextAlignment(.center)
                    .padding()
//                    .background(Color.gray.opacity(0.4))
//                    .cornerRadius(10)
                
                SecureField("Confirm Password", text: $confirm_password)
                    .textFieldStyle (RoundedBorderTextFieldStyle())
                    .multilineTextAlignment(.center)
                    .padding()
//                    .cornerRadius(10)
//                    .background(Color.gray.opacity(0.4))

                
                
                
                HStack {
                    Button {
                        viewModel.signIn()
                    } label: {
                        Text("Sign In")
                            .fontWeight(.bold)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }

                    
                    Button(action: {
                        // register()
                    }) {
                        Text("Register")
                    }
                    .fontWeight(.bold)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                
                
                
            }
            .padding()
            .background(Color.black.opacity(0.5))
            .cornerRadius(10)
            .padding()
            .padding(.top, -20)
//            .padding()
            
            Spacer()
            
            VStack {
                NavigationLink(destination: ContentView()) {
                    Text("Home")
                }
                NavigationLink(destination: Text("Recipe Finder")) {
                    Text("Recipe Finder")
                }
                NavigationLink(destination: Text("About Us")) {
                    Text("About Us")
                }
//                NavigationLink(destination: Text("Login")) {
//                    Text("Login")
//                }
                NavigationLink(destination: Text("Contact")) {
                    Text("Contact")
                }
            }
            .padding(.bottom, 80)
            .foregroundColor(.white)
            .multilineTextAlignment(.center)
            
            Spacer()
        }
//        Spacer()
            .background(
                VStack {
                    Image("food2")
                        .resizable()
                        .scaledToFill()
                        .frame(maxWidth: .infinity)
                        .frame(height: UIScreen.main.bounds.height * 0.68) // 3/4 of the screen height
                        .clipped()
                    Spacer()
                    HStack {
                        Spacer()
                        Image("fb")
                            .resizable()
                            .frame(width: 50, height: 50)
                        Image("ig")
                            .resizable()
                            .frame(width: 50, height: 50)
                        Image("tw")
                            .resizable()
                            .frame(width: 50, height: 50)
                        Spacer()
                    }
                    .padding(.bottom, 50)
                }
                .background(Color.black)
                .edgesIgnoringSafeArea(.all)
            )
    }
}




struct SignInEmailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            SignInEmailView()
        }
    }
}
