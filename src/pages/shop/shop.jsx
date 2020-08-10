import React, { useEffect } from "react";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionOverview from "../../components/collection-overview/collection-overview";
import CollectionPage from "../collection/collection";
import WithSpinner from "../../components/with-spinner/with-spinner";
import { fetchCollectionsStart } from "../../redux/shop/shop-actions";
import { selectIsFetching } from "../../redux/shop/shop-selectors";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const ShopPage = ({ fetchCollections, match, isCollectionsFetching }) => {
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionOverviewWithSpinner
            isLoading={isCollectionsFetching}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={isCollectionsFetching}
            {...props}
          />
        )}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
