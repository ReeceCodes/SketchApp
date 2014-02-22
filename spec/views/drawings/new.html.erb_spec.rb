require 'spec_helper'

describe "drawings/new" do
  before(:each) do
    assign(:drawing, stub_model(Drawing,
      :id => 1,
      :name => "MyString",
      :commands => "MyString"
    ).as_new_record)
  end

  it "renders new drawing form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", drawings_path, "post" do
      assert_select "input#drawing_id[name=?]", "drawing[id]"
      assert_select "input#drawing_name[name=?]", "drawing[name]"
      assert_select "input#drawing_commands[name=?]", "drawing[commands]"
    end
  end
end
