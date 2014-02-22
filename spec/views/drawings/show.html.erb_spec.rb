require 'spec_helper'

describe "drawings/show" do
  before(:each) do
    @drawing = assign(:drawing, stub_model(Drawing,
      :id => 1,
      :name => "Name",
      :commands => "Commands"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/Name/)
    rendered.should match(/Commands/)
  end
end
