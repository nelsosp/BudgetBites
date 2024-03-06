import SwiftUI

struct HomePageView: View {
    var body: some View {
        NavigationView {
            VStack {
                // Header
//                Text("Budget Bites")
//                    .font(.largeTitle)
//                    .fontWeight(.bold)
//                    .padding()
                
                // Main content
                Spacer()
                VStack {
                    Text("Budget")
                        .font(.largeTitle)
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .foregroundColor(.white)
                    Text("Bites")
                        .font(.largeTitle)
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .foregroundColor(.white)
                    Text("For the people, By the people")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .multilineTextAlignment(.center)
                    
                    NavigationLink(destination: Text("Recipe Finder")) {
                        Text("Find Recipes")
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
                
                Spacer()
                
                // Navigation links at bottom of page
                VStack {
                    NavigationLink(destination: Text("Recipe Finder")) {
                        Text("Recipe Finder")
                    }
                    NavigationLink(destination: Text("About Us")) {
                        Text("About Us")
                    }
                    NavigationLink(destination: SignInEmailView()) {
                        Text("Login")
                    }
                    NavigationLink(destination: Text("Contact")) {
                        Text("Contact")
                    }
                }
                .padding(.top, 0)
                .foregroundColor(.white)
                .multilineTextAlignment(.center)
                
                Spacer()
            }
            .background(
                VStack {
                    Image("food")
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
            .navigationBarItems(trailing:
                Menu {
                    NavigationLink(destination: Text("Recipe Finder")) {
                        Label("Recipe Finder", systemImage: "magnifyingglass")
                    }
                } label: {
                    Image(systemName: "line.horizontal.3")
                        .font(.title)
                        .padding()
                }
            )
        }
    }
}



struct HomePageView_Previews: PreviewProvider {
    static var previews: some View {
        HomePageView()
    }
}
