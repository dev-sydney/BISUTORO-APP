class APIFeatures {
  constructor(mongooseQuery, reqQuery) {
    this.mongooseQuery = mongooseQuery;
    this.reqQuery = reqQuery;
  }
  //FILTERING OUT QUERY BASED OFF req.query
  filter() {
    this.mongooseQuery = this.mongooseQuery.find(this.reqQuery);
    return this;
  }
  //SORTING
  sort() {
    if (this.reqQuery.sort) {
      this.mongooseQuery = this.mongooseQuery.sort(this.reqQuery.sort);
      return this;
    }
    return this;
  }

  fieldLimit() {
    if (this.reqQuery.fields) {
      const selectedFields = this.reqQuery.fields.split(',');
      this.mongooseQuery = this.mongooseQuery.select(selectedFields);
      return this;
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  paginate() {
    if (this.reqQuery.page || this.reqQuery.limit) {
      const limitValue = this.reqQuery.limit ? this.reqQuery.limit : 6;
      // const skipValue = (this.reqQuery.page - 1) * limitValue;
      const skipValue = this.reqQuery.page
        ? (this.reqQuery.page - 1) * limitValue
        : 0;
      this.mongooseQuery = this.mongooseQuery.skip(skipValue).limit(limitValue);
      return this;
    }
    return this;
  }
}

module.exports = APIFeatures;
