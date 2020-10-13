import React from "react";
import "./Style-content.css";

export default function ContentDash() {
	return (
		<div>
			<div className="dashboard">
				<div className="dashboard-header">
					<h1>Dashboard</h1>
				</div>
				<div className="dashboard-statistic">
					<div className="statistic">
						<div className="wrapper">
							<div className="statistic-title">
								<i className="fa fa-bar-chart"></i>
								<p>Site Statistics</p>
							</div>
							<div className="statistic-container">
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-users"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												RIDERS
											</div>
											<div className="item-content-value">
												65
											</div>
										</div>
									</div>
								</div>
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-male"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												DRIVERS
											</div>
											<div className="item-content-value">
												63
											</div>
										</div>
									</div>
								</div>
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-building-o"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												COMPANIES
											</div>
											<div className="item-content-value">
												2
											</div>
										</div>
									</div>
								</div>
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-money"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												TOTAL EARNINGS
											</div>
											<div className="item-content-value">
												$ 819.14
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="statistic">
						<div className="wrapper">
							<div className="statistic-title">
								<i className="fa fa-area-chart"></i>
								<p>Site Statistics</p>
							</div>
							<div className="statistic-container">
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-cubes"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												Total Rides
											</div>
											<div className="item-content-value">
												88
											</div>
										</div>
									</div>
								</div>
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-clone"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												On Going Rides
											</div>
											<div className="item-content-value">
												63
											</div>
										</div>
									</div>
								</div>
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-clone"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												Cancelled Rides
											</div>
											<div className="item-content-value">
												1
											</div>
										</div>
									</div>
								</div>
								<div className="statistic-item">
									<div className="item">
										<div className="icon">
											<i className="fa fa-check"></i>
										</div>
										<div className="item-content">
											<div className="item-content-title">
												Completed Rides
											</div>
											<div className="item-content-value">
												62
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr></hr>
			</div>
		</div>
	);
}
