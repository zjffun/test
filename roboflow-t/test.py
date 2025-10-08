# Import the InferencePipeline object
from inference import InferencePipeline
# Import the built in render_boxes sink for visualizing results
from inference.core.interfaces.stream.sinks import render_boxes

print('zjftest')

# from inference import get_model

# model = get_model(model_id="my-first-project-vhqfm/3")

# initialize a pipeline object
pipeline = InferencePipeline.init(
    model_id="my-first-project-vhqfm/3", # Roboflow model to use
    video_reference='./20250929-212148.mp4', # Path to video, device id (int, usually 0 for built in webcams), or RTSP stream url
    on_prediction=render_boxes, # Function to run after each prediction,
    max_fps=2,
)
pipeline.start()
pipeline.join()
