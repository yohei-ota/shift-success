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
  attr_accessor :collection

  
  
  def initialize(attributes = {})
    # super attributes
    self.collection = COLLECTION_NUM.times.map { WorkSchedule.new() } unless self.collection.present?
  end
  
  def collection_attributes=(attributes)
    self.collection = attributes.map { |_, v| WorkSchedule.new(v) }
  end
  
  def save
    WorkSchedule.transaction do
      self.collection.map(&:save!)
    end
    return true
  rescue => e
    return false
  end
end