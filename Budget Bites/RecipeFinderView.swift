import SwiftUI

struct RecipeFinderView: View {
    @State private var isShowingCuisineMenu = false
    @State private var isShowingDietMenu = false
    @State private var selectedCuisineIndices: Set<Int> = []
    @State private var selectedDietIndices: Set<Int> = []
    @State private var budgetAmount: String = ""
    @State private var keywordSearch: String = ""
    
    let cuisines = ["Italian", "Mexican", "Thai", "Japanese", "Chinese", "Indian", "American"]
    let diets = ["Vegetarian", "Vegan", "Paleo", "Gluten-Free", "Keto", "Dairy-Free", "Low Calorie", "Low Sodium"]
    
    var selectedCuisinesString: String {
        selectedCuisineIndices.map {cuisines[$0]}.joined(separator: ", ")
    }
    var selectedDietsString: String {
        selectedDietIndices.map {diets[$0]}.joined(separator: ", ")
    }
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.black.opacity(0.5))
                .padding()
                .padding(.bottom, 310)
            
            VStack {
                TextField("Enter Budget Amount", text: $budgetAmount)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                    .multilineTextAlignment(.center)
                TextField("Enter Keyword", text: $keywordSearch)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                    .multilineTextAlignment(.center)
                
                Button(action: {
                    self.isShowingCuisineMenu.toggle()
                }) {
                    Text("Select Cuisines")
                }
                .padding()
                .fullScreenCover(isPresented: $isShowingCuisineMenu) {
                    SelectionListView(options: cuisines, selectedIndices:
                                        $selectedCuisineIndices, title: "Cuisine Type Selection")
                }
                .fontWeight(.bold)
                
                
                Text("\(selectedCuisinesString)")
                    .foregroundColor(.white)
                Button(action: {
                    self.isShowingDietMenu.toggle()
                }) {
                    Text("Select Diets")
                }
                .padding()
                .fullScreenCover(isPresented: $isShowingDietMenu) {
                    SelectionListView(options: diets, selectedIndices: $selectedDietIndices, title: "Diet Type Selection")
                }
                .fontWeight(.bold)
                
                Text("\(selectedDietsString)")
                    .foregroundColor(.white)
                
                Button(action: {}) {
                    Text("Find Recipes")
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                Spacer()
            }
            .padding()
            .padding()
        }
        .background(
            VStack {
                Image("food4")
                    .resizable()
                    .scaledToFill()
                    .frame(maxWidth: .infinity)
                    .clipped()
            }
                .background(Color.black)
                .edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
        )
    }
}
    

struct  SelectionListView: View {
    let options: [String]
    @Binding var selectedIndices: Set<Int>
    let title: String
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            List {
                ForEach(options.indices, id: \.self) { index in
                    Button(action: {
                        if self.selectedIndices.contains(index) {
                            self.selectedIndices.remove(index)
                        } else {
                            self.selectedIndices.insert(index)
                        }
                    }) {
                        HStack {
                            Text(options[index])
                            Spacer()
                            if self.selectedIndices.contains(index) {
                                Image(systemName: "checkmark")
                            }
                        }
                    }
                }
            }
            .navigationTitle(title)
            .navigationBarItems(trailing: Button("Done") {
                self.presentationMode.wrappedValue.dismiss()
            })
        }
    }
}
                

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        RecipeFinderView()
    }
}

