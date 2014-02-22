require "spec_helper"

describe DrawingsController do
  describe "routing" do

    it "routes to #index" do
      get("/drawings").should route_to("drawings#index")
    end

    it "routes to #new" do
      get("/drawings/new").should route_to("drawings#new")
    end

    it "routes to #show" do
      get("/drawings/1").should route_to("drawings#show", :id => "1")
    end

    it "routes to #edit" do
      get("/drawings/1/edit").should route_to("drawings#edit", :id => "1")
    end

    it "routes to #create" do
      post("/drawings").should route_to("drawings#create")
    end

    it "routes to #update" do
      put("/drawings/1").should route_to("drawings#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/drawings/1").should route_to("drawings#destroy", :id => "1")
    end

  end
end
