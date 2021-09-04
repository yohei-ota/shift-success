class WorkScheduleCollection
  include ActiveModel::Model
  
  COLLECTION_NUM = 7
  REGISTRABLE_ATTRIBUTES = %i(
    datetime_in(1i) datetime_in(2i) datetime_in(3i) datetime_in(4i) datetime_in(5i)
    datetime_out(1i) datetime_out(2i) datetime_out(3i) datetime_out(4i) datetime_out(5i)
    holiday
    user_id
    group_id
  )
  attr_accessor :collections, :user_id, :group_id
 
  
  
  def initialize(attributes = {})
    super attributes
    self.collections = COLLECTION_NUM.times.map { WorkSchedule.new } unless self.collections.present?
  end
  
  def collections_attributes=(attributes)
    self.collections = attributes.map do |_, collection_attributes|
      WorkSchedule.new(collection_attributes)
    end
  end
  
  def save
    WorkSchedule.transaction do
      COLLECTION_NUM.times do |i| 
        self.collections[i].user_id = @user_id
        self.collections[i].group_id = @group_id
      end
      self.collections.map(&:save!)
    end
    return true
  rescue => e
    return false
  end
end