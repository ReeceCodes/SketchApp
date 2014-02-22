require 'spec_helper'

describe "drawings/index" do
  before(:each) do
    assign(:drawings, [
      stub_model(Drawing,
        :id => 1,
        :name => "Name",
        :commands => "Commands"
      ),
      stub_model(Drawing,
        :id => 1,
        :name => "Name",
        :commands => "Commands"
      )
    ])
  end

  it "renders a list of drawings" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Commands".to_s, :count => 2
  end
end
