// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";

import * as styles from "readium-desktop/renderer/assets/styles/opds.css";

import { Link } from "react-router-dom";

import { withApi } from "readium-desktop/renderer/components/utils/api";

import { OpdsFeedView } from "readium-desktop/common/views/opds";

interface OpdsListProps {
    feeds?: any;
}

export class FeedList extends React.Component<OpdsListProps, null> {
    public render(): React.ReactElement<{}>  {
        if (!this.props.feeds) {
            return <></>;
        }

        return (
            <section className={styles.opds_list}>
                { this.props.feeds.map((item: OpdsFeedView) =>
                    <Link to={"/catalogs/" + item.identifier}>
                        <div>
                            <p>{ item.title }</p>
                        </div>
                    </Link>,
                )}
            </section>
        );
    }
}

export default withApi(
    FeedList,
    {
        operations: [
            {
                moduleId: "opds",
                methodId: "findAllFeeds",
                resultProp: "feeds",
                onLoad: true,
            },
        ],
    },
);